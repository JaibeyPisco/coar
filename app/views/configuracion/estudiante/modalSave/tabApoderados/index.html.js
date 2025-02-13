export default `
    <div class="card border-primary border-top border-3">
        <div class="card-body">
            <span style="font-size: 18px;" class="mb-3"><b>Datos del apoderado</b></span>
            <div class="row mt-3">
                <div class="col-md-12">
                    <table class="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>APELLIDOS</th>
                                <th>NOMBRES</th>

                                <th>DNI</th>
                                <th>NUMERO TELEFÓNICO</th>
                                <th>GRADO DE PARENTESCO</th>
                                <th>¿LEGALIZADO?</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody name="tabla_agregar_apoderado"></tbody>
                        <tfoot>
                            <tr>
                                <td colspan="6" align="center">
                                    <button type="button" name="agregar_apoderado" style="font-size: 14px;" class="btn btn-primary"><i class="fadeIn animated bx bx-plus" style="font-size: 14px;"></i> Agregar Apoderado</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
`;