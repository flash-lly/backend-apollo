import { UserJwtPayload } from './jwt';

export interface AppContext {
  jwtUser: UserJwtPayload | null;
}

interface SourceLocation {
  readonly line: number;
  readonly column: number;
}

export interface GraphQLFormattedError {
  readonly message: string;
  readonly locations?: ReadonlyArray<SourceLocation>;
  readonly path?: ReadonlyArray<string | number>;
  readonly extensions?: { [key: string]: unknown };
}
