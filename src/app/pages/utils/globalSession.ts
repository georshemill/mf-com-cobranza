import { AuthAPI, OptionsAPI, JwtUtils, Session, StorageConstants } from '@test/mf-utils-modules';

export class GlobalSession {
  static get idEmpresa(): number {
    return Session.get('IDEMPRESA');
  }

  static get idSede(): number {
    return Session.get('IDSEDE');
  }

  static get idUsuario(): number  {
    return Session.get('IDUSUARIO');
  }

  static get usuario(): any {
    return Session.get('USUARIO');
  }

  static get nombre(): any {
    return Session.get('NOMBRE');
  }


  static clear(): void {
    Session.remove('IDEMPRESA');
    Session.remove('IDSEDE');
    Session.remove('IDUSUARIO');
    Session.remove('USUARIO');
    Session.remove('NOMBRE');
  }
}
