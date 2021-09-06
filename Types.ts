export type Movie = {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  star?: number;
};
export type MovieWithUserId = {
  userId: string;
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  star?: number;
};

export type NewMovie = {
  id?: string | unknown
  title: string;
  description: string;
  image: string;
  author: string;
};

export type User = {
  id: string,
  username: string,
  email?: string,
  password?: string,
  movies: Movie[] | null,
}

export type LoginAuth = {
  email: string,
  password: string,
}

export type SignUpAuth = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

// 使うか怪しい▼
export type sessionType = {
  session: {
    name: string;
    email: string;
    sub: string;
    iat: number;
    exp: number;
  };
};