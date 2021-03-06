// Generated by https://quicktype.io
export interface LoginData {
    correo: string;
    password: string;
}



export interface LoginResponse {
    usuario: Usuario;
    token:   string;
}

// Generated by https://quicktype.io

export interface CategoriesResponse {
    total:      number;
    categorias: Categoria[];
}

export interface Categoria {
    _id:     string;
    nombre:  string;
    usuario?: Usuario;
}


// Generated by https://quicktype.io

export interface ProductsResponse {
    total:     number;
    productos: Producto[];
}

export interface Producto {
    precio:    number;
    _id:       string;
    nombre:    string;
    categoria: Categoria;
    usuario:   Categoria;
    img?:      string;
}







export interface Usuario {
    _id:    string;
    nombre: string;
}





export enum ID {
    The60Bfe0607F3D240Dd420Fc97 = "60bfe0607f3d240dd420fc97",
    The60Bfe1417F3D240Dd420Fc98 = "60bfe1417f3d240dd420fc98",
    The60Bfe16A7F3D240Dd420Fc99 = "60bfe16a7f3d240dd420fc99",
}

export enum Nombre {
    Controles = "CONTROLES",
    Monitores = "MONITORES",
    Test1 = "test 1",
}


export interface RegisterData {
    nombre: string;
    correo:string;
    password:string
}

export interface Usuario {
    rol:    string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid:    string;
    img?: string;
}




