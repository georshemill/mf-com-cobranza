export class GlobalSession {
  static get idEmpresa(): number {
    const value = localStorage.getItem('IDEMPRESA');
    return value ? parseInt(value, 10) : 0;
  }

  static get idSede(): number {
    const value = localStorage.getItem('IDSEDE');
    return value ? parseInt(value, 10) : 0;
  }

  static get idUsuario(): number {
    const value = localStorage.getItem('IDUSUARIO');
    return value ? parseInt(value, 10) : 0;
  }

  static get usuario(): string {
    return localStorage.getItem('USUARIO') || '';
  }

  static get nombre(): string {
    return localStorage.getItem('NOMBRE') || '';
  }

  static clear(): void {
    localStorage.removeItem('IDEMPRESA');
    localStorage.removeItem('IDSEDE');
    localStorage.removeItem('IDUSUARIO');
    localStorage.removeItem('USUARIO');
    localStorage.removeItem('NOMBRE');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_INFO');
  }
}