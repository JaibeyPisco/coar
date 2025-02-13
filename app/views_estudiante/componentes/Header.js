export default function(BASE_URL, style_change_color, usuario){
    return /*html*/`
		<header>
			<div class="topbar d-flex align-items-center">
				<nav class="navbar navbar-expand">
					<div class="mobile-toggle-menu"><i class='bx bx-menu' style="color: #fff"></i>
					</div>
					<div class="search-bar flex-grow-1">
						<div style="font-weight: 600; font-size: 20px; color: #fff !important">
							`+(usuario.local != null ? usuario.local : "")+`
						</div>
					</div>
					<div class="top-menu ms-auto">
						<ul class="navbar-nav align-items-center">
							
							<li class="nav-item dark-mode d-sm-flex">
								<a class="nav-link dark-mode-icon" style="color: #FFFFFF;" href="javascript:;"><i class='bx bx-moon'></i>
								</a>
							</li>
							 
							<li class="nav-item dropdown dropdown-large">
								<div class="dropdown-menu dropdown-menu-end">
									<a href="javascript:;">
										<div class="msg-header">
											<p class="msg-header-title">Notificaciones</p>
										</div>
									</a>
									<div class="header-notifications-list" id="header-notifications-list"></div>
									<a href="javascript:;">
										<div class="text-center msg-footer" id="eliminar_todas_nofiticacion">Borrar Notificaciones</div>
									</a>
								</div>
							</li>
							<li class="nav-item dropdown dropdown-large">
								<div class="dropdown-menu dropdown-menu-end">
									<a href="javascript:;">
										<div class="msg-header">
											<p class="msg-header-title">Mensajes</p>
										</div>
									</a>
									<div class="header-message-list" id="header-message-list"></div>
									<a href="javascript:;">
										<div class="text-center msg-footer" id="eliminar_todas_nofiticacion_chat">Borrar Notificaciones</div>
									</a>
								</div>
							</li>
						</ul>
					</div>
					<div class="user-box border-start-0 border-end-0 dropdown">
						<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="${BASE_FILES + "/images/" + usuario.imagen}" class="user-img" alt="user avatar">
							<div class="user-info ps-3">
								<p class="user-name mb-0" style="color: #FFFFFF;">`+usuario.nombre+`</p>
								<p class="designattion mb-0" style="color: #FFFFFF;">`+(usuario.tipo_persona != null ? usuario.tipo_persona : "Null")+`</p>
							</div>
						</a>
						<ul class="dropdown-menu dropdown-menu-end">
							<!--<li><a class="dropdown-item" href="#"><i class="bx bx-user"></i> My Profile</a></li>
							<li><a class="dropdown-item" href="#"><i class="bx bx-cog"></i> My Balance</a></li>
							<li><a class="dropdown-item" href="#"><i class="bx bx-home-circle"></i> Inbox</a></li>
							<li role="separator" class="divider"></li>
							<li><a class="dropdown-item" href="#"><i class="bx bx-download"></i> Account Setting</a></li>
							<li role="separator" class="divider"></li>-->
							<li><a class="dropdown-item" href="javascript:" id="cambiar_password"><i class="bx bx-dollar-circle"></i>Cambiar contraseña</a></li>
							<li><a class="dropdown-item" href="javascript:" id="cerrar_sesion"><i class="bx bx-download"></i> Cerrar sesión</a></li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
    `;
}