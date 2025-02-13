<?php
namespace App\Libraries;

use App\Models\Sistema\Chat_model;
use Exception;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {

    protected $clients;
    private $Chat_m;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->Chat_m = new Chat_model();
    }

    public function onOpen(ConnectionInterface $conn) {

        // Genera un identificador único para el usuario
        $userId = ID_USUARIO;
        
        // Guarda la conexión y el identificador único en un arreglo
        $this->clients[$userId] = $conn;
        
        // Envía un mensaje de bienvenida que incluya el identificador único del usuario
        $message = json_encode(array(
            'type' => 'welcome',
            'userId' => $userId
        ));

        $conn->send($message);

        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {

        try {
            $data = json_decode($msg, true);
            $senderId = ID_USUARIO;
            $receiver_id = $data['receiver_id'];
            $messageText = $data['mensaje'];
            
            // Busca la conexión del destinatario
            $recipient = $this->clients[$receiver_id] ?? null;
            
            // Si el destinatario existe, envía el mensaje solo a él
            if ($recipient) {
                $message = json_encode(array(
                    'type' => 'message',
                    'senderId' => $senderId,
                    'message' => $messageText
                ));
                $recipient->send($message);
            }

            // Ejecuta la lógica para guardar los datos en la base de datos
            $db = \Config\Database::connect();
            $builder = $db->table('chat');
            $builder->insert([
                'sender_id' => 52,
                'receiver_id' => 53,
                'message' => 'Mensaje test'
            ]);

            $response = array(
                'receiver_id' => $receiver_id,
                'mensaje' => $messageText
            );

            foreach ($this->clients as $client) {
                $client->send(json_encode($response));
            }
        } catch (\Throwable $th) {
            throw new Exception("esta mal");
        }
        

    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}