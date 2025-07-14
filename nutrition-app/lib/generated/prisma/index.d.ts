
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model components
 * 
 */
export type components = $Result.DefaultSelection<Prisma.$componentsPayload>
/**
 * Model component_portions
 * 
 */
export type component_portions = $Result.DefaultSelection<Prisma.$component_portionsPayload>
/**
 * Model ingredients
 * 
 */
export type ingredients = $Result.DefaultSelection<Prisma.$ingredientsPayload>
/**
 * Model meals
 * 
 */
export type meals = $Result.DefaultSelection<Prisma.$mealsPayload>
/**
 * Model portion_options
 * 
 */
export type portion_options = $Result.DefaultSelection<Prisma.$portion_optionsPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model recipe_ingredients
 * 
 */
export type recipe_ingredients = $Result.DefaultSelection<Prisma.$recipe_ingredientsPayload>
/**
 * Model component_category
 * 
 */
export type component_category = $Result.DefaultSelection<Prisma.$component_categoryPayload>
/**
 * Model SystemConfig
 * 
 */
export type SystemConfig = $Result.DefaultSelection<Prisma.$SystemConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Components
 * const components = await prisma.components.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Components
   * const components = await prisma.components.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.components`: Exposes CRUD operations for the **components** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Components
    * const components = await prisma.components.findMany()
    * ```
    */
  get components(): Prisma.componentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.component_portions`: Exposes CRUD operations for the **component_portions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Component_portions
    * const component_portions = await prisma.component_portions.findMany()
    * ```
    */
  get component_portions(): Prisma.component_portionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ingredients`: Exposes CRUD operations for the **ingredients** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredients
    * const ingredients = await prisma.ingredients.findMany()
    * ```
    */
  get ingredients(): Prisma.ingredientsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meals`: Exposes CRUD operations for the **meals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meals
    * const meals = await prisma.meals.findMany()
    * ```
    */
  get meals(): Prisma.mealsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portion_options`: Exposes CRUD operations for the **portion_options** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portion_options
    * const portion_options = await prisma.portion_options.findMany()
    * ```
    */
  get portion_options(): Prisma.portion_optionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipe_ingredients`: Exposes CRUD operations for the **recipe_ingredients** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipe_ingredients
    * const recipe_ingredients = await prisma.recipe_ingredients.findMany()
    * ```
    */
  get recipe_ingredients(): Prisma.recipe_ingredientsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.component_category`: Exposes CRUD operations for the **component_category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Component_categories
    * const component_categories = await prisma.component_category.findMany()
    * ```
    */
  get component_category(): Prisma.component_categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemConfig`: Exposes CRUD operations for the **SystemConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemConfigs
    * const systemConfigs = await prisma.systemConfig.findMany()
    * ```
    */
  get systemConfig(): Prisma.SystemConfigDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    components: 'components',
    component_portions: 'component_portions',
    ingredients: 'ingredients',
    meals: 'meals',
    portion_options: 'portion_options',
    User: 'User',
    recipe_ingredients: 'recipe_ingredients',
    component_category: 'component_category',
    SystemConfig: 'SystemConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "components" | "component_portions" | "ingredients" | "meals" | "portion_options" | "user" | "recipe_ingredients" | "component_category" | "systemConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      components: {
        payload: Prisma.$componentsPayload<ExtArgs>
        fields: Prisma.componentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.componentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.componentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>
          }
          findFirst: {
            args: Prisma.componentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.componentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>
          }
          findMany: {
            args: Prisma.componentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>[]
          }
          create: {
            args: Prisma.componentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>
          }
          createMany: {
            args: Prisma.componentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.componentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>[]
          }
          delete: {
            args: Prisma.componentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>
          }
          update: {
            args: Prisma.componentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>
          }
          deleteMany: {
            args: Prisma.componentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.componentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.componentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>[]
          }
          upsert: {
            args: Prisma.componentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$componentsPayload>
          }
          aggregate: {
            args: Prisma.ComponentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComponents>
          }
          groupBy: {
            args: Prisma.componentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComponentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.componentsCountArgs<ExtArgs>
            result: $Utils.Optional<ComponentsCountAggregateOutputType> | number
          }
        }
      }
      component_portions: {
        payload: Prisma.$component_portionsPayload<ExtArgs>
        fields: Prisma.component_portionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.component_portionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.component_portionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>
          }
          findFirst: {
            args: Prisma.component_portionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.component_portionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>
          }
          findMany: {
            args: Prisma.component_portionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>[]
          }
          create: {
            args: Prisma.component_portionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>
          }
          createMany: {
            args: Prisma.component_portionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.component_portionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>[]
          }
          delete: {
            args: Prisma.component_portionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>
          }
          update: {
            args: Prisma.component_portionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>
          }
          deleteMany: {
            args: Prisma.component_portionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.component_portionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.component_portionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>[]
          }
          upsert: {
            args: Prisma.component_portionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_portionsPayload>
          }
          aggregate: {
            args: Prisma.Component_portionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComponent_portions>
          }
          groupBy: {
            args: Prisma.component_portionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Component_portionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.component_portionsCountArgs<ExtArgs>
            result: $Utils.Optional<Component_portionsCountAggregateOutputType> | number
          }
        }
      }
      ingredients: {
        payload: Prisma.$ingredientsPayload<ExtArgs>
        fields: Prisma.ingredientsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ingredientsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ingredientsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>
          }
          findFirst: {
            args: Prisma.ingredientsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ingredientsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>
          }
          findMany: {
            args: Prisma.ingredientsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>[]
          }
          create: {
            args: Prisma.ingredientsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>
          }
          createMany: {
            args: Prisma.ingredientsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ingredientsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>[]
          }
          delete: {
            args: Prisma.ingredientsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>
          }
          update: {
            args: Prisma.ingredientsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>
          }
          deleteMany: {
            args: Prisma.ingredientsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ingredientsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ingredientsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>[]
          }
          upsert: {
            args: Prisma.ingredientsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ingredientsPayload>
          }
          aggregate: {
            args: Prisma.IngredientsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIngredients>
          }
          groupBy: {
            args: Prisma.ingredientsGroupByArgs<ExtArgs>
            result: $Utils.Optional<IngredientsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ingredientsCountArgs<ExtArgs>
            result: $Utils.Optional<IngredientsCountAggregateOutputType> | number
          }
        }
      }
      meals: {
        payload: Prisma.$mealsPayload<ExtArgs>
        fields: Prisma.mealsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mealsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mealsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>
          }
          findFirst: {
            args: Prisma.mealsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mealsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>
          }
          findMany: {
            args: Prisma.mealsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>[]
          }
          create: {
            args: Prisma.mealsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>
          }
          createMany: {
            args: Prisma.mealsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mealsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>[]
          }
          delete: {
            args: Prisma.mealsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>
          }
          update: {
            args: Prisma.mealsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>
          }
          deleteMany: {
            args: Prisma.mealsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mealsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mealsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>[]
          }
          upsert: {
            args: Prisma.mealsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mealsPayload>
          }
          aggregate: {
            args: Prisma.MealsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeals>
          }
          groupBy: {
            args: Prisma.mealsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealsGroupByOutputType>[]
          }
          count: {
            args: Prisma.mealsCountArgs<ExtArgs>
            result: $Utils.Optional<MealsCountAggregateOutputType> | number
          }
        }
      }
      portion_options: {
        payload: Prisma.$portion_optionsPayload<ExtArgs>
        fields: Prisma.portion_optionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.portion_optionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.portion_optionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>
          }
          findFirst: {
            args: Prisma.portion_optionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.portion_optionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>
          }
          findMany: {
            args: Prisma.portion_optionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>[]
          }
          create: {
            args: Prisma.portion_optionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>
          }
          createMany: {
            args: Prisma.portion_optionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.portion_optionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>[]
          }
          delete: {
            args: Prisma.portion_optionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>
          }
          update: {
            args: Prisma.portion_optionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>
          }
          deleteMany: {
            args: Prisma.portion_optionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.portion_optionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.portion_optionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>[]
          }
          upsert: {
            args: Prisma.portion_optionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$portion_optionsPayload>
          }
          aggregate: {
            args: Prisma.Portion_optionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortion_options>
          }
          groupBy: {
            args: Prisma.portion_optionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Portion_optionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.portion_optionsCountArgs<ExtArgs>
            result: $Utils.Optional<Portion_optionsCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      recipe_ingredients: {
        payload: Prisma.$recipe_ingredientsPayload<ExtArgs>
        fields: Prisma.recipe_ingredientsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.recipe_ingredientsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.recipe_ingredientsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>
          }
          findFirst: {
            args: Prisma.recipe_ingredientsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.recipe_ingredientsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>
          }
          findMany: {
            args: Prisma.recipe_ingredientsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>[]
          }
          create: {
            args: Prisma.recipe_ingredientsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>
          }
          createMany: {
            args: Prisma.recipe_ingredientsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.recipe_ingredientsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>[]
          }
          delete: {
            args: Prisma.recipe_ingredientsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>
          }
          update: {
            args: Prisma.recipe_ingredientsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>
          }
          deleteMany: {
            args: Prisma.recipe_ingredientsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.recipe_ingredientsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.recipe_ingredientsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>[]
          }
          upsert: {
            args: Prisma.recipe_ingredientsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipe_ingredientsPayload>
          }
          aggregate: {
            args: Prisma.Recipe_ingredientsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipe_ingredients>
          }
          groupBy: {
            args: Prisma.recipe_ingredientsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Recipe_ingredientsGroupByOutputType>[]
          }
          count: {
            args: Prisma.recipe_ingredientsCountArgs<ExtArgs>
            result: $Utils.Optional<Recipe_ingredientsCountAggregateOutputType> | number
          }
        }
      }
      component_category: {
        payload: Prisma.$component_categoryPayload<ExtArgs>
        fields: Prisma.component_categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.component_categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.component_categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>
          }
          findFirst: {
            args: Prisma.component_categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.component_categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>
          }
          findMany: {
            args: Prisma.component_categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>[]
          }
          create: {
            args: Prisma.component_categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>
          }
          createMany: {
            args: Prisma.component_categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.component_categoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>[]
          }
          delete: {
            args: Prisma.component_categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>
          }
          update: {
            args: Prisma.component_categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>
          }
          deleteMany: {
            args: Prisma.component_categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.component_categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.component_categoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>[]
          }
          upsert: {
            args: Prisma.component_categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$component_categoryPayload>
          }
          aggregate: {
            args: Prisma.Component_categoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComponent_category>
          }
          groupBy: {
            args: Prisma.component_categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<Component_categoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.component_categoryCountArgs<ExtArgs>
            result: $Utils.Optional<Component_categoryCountAggregateOutputType> | number
          }
        }
      }
      SystemConfig: {
        payload: Prisma.$SystemConfigPayload<ExtArgs>
        fields: Prisma.SystemConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findFirst: {
            args: Prisma.SystemConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findMany: {
            args: Prisma.SystemConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          create: {
            args: Prisma.SystemConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          createMany: {
            args: Prisma.SystemConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          delete: {
            args: Prisma.SystemConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          update: {
            args: Prisma.SystemConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          deleteMany: {
            args: Prisma.SystemConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          upsert: {
            args: Prisma.SystemConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          aggregate: {
            args: Prisma.SystemConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemConfig>
          }
          groupBy: {
            args: Prisma.SystemConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    components?: componentsOmit
    component_portions?: component_portionsOmit
    ingredients?: ingredientsOmit
    meals?: mealsOmit
    portion_options?: portion_optionsOmit
    user?: UserOmit
    recipe_ingredients?: recipe_ingredientsOmit
    component_category?: component_categoryOmit
    systemConfig?: SystemConfigOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ComponentsCountOutputType
   */

  export type ComponentsCountOutputType = {
    recipe_ingredients: number
    component_portions: number
  }

  export type ComponentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe_ingredients?: boolean | ComponentsCountOutputTypeCountRecipe_ingredientsArgs
    component_portions?: boolean | ComponentsCountOutputTypeCountComponent_portionsArgs
  }

  // Custom InputTypes
  /**
   * ComponentsCountOutputType without action
   */
  export type ComponentsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComponentsCountOutputType
     */
    select?: ComponentsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComponentsCountOutputType without action
   */
  export type ComponentsCountOutputTypeCountRecipe_ingredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: recipe_ingredientsWhereInput
  }

  /**
   * ComponentsCountOutputType without action
   */
  export type ComponentsCountOutputTypeCountComponent_portionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: component_portionsWhereInput
  }


  /**
   * Count Type IngredientsCountOutputType
   */

  export type IngredientsCountOutputType = {
    recipe_ingredients: number
  }

  export type IngredientsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe_ingredients?: boolean | IngredientsCountOutputTypeCountRecipe_ingredientsArgs
  }

  // Custom InputTypes
  /**
   * IngredientsCountOutputType without action
   */
  export type IngredientsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientsCountOutputType
     */
    select?: IngredientsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IngredientsCountOutputType without action
   */
  export type IngredientsCountOutputTypeCountRecipe_ingredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: recipe_ingredientsWhereInput
  }


  /**
   * Count Type MealsCountOutputType
   */

  export type MealsCountOutputType = {
    components: number
    portion_options: number
  }

  export type MealsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | MealsCountOutputTypeCountComponentsArgs
    portion_options?: boolean | MealsCountOutputTypeCountPortion_optionsArgs
  }

  // Custom InputTypes
  /**
   * MealsCountOutputType without action
   */
  export type MealsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealsCountOutputType
     */
    select?: MealsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MealsCountOutputType without action
   */
  export type MealsCountOutputTypeCountComponentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: componentsWhereInput
  }

  /**
   * MealsCountOutputType without action
   */
  export type MealsCountOutputTypeCountPortion_optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: portion_optionsWhereInput
  }


  /**
   * Count Type Component_categoryCountOutputType
   */

  export type Component_categoryCountOutputType = {
    components: number
  }

  export type Component_categoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | Component_categoryCountOutputTypeCountComponentsArgs
  }

  // Custom InputTypes
  /**
   * Component_categoryCountOutputType without action
   */
  export type Component_categoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component_categoryCountOutputType
     */
    select?: Component_categoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Component_categoryCountOutputType without action
   */
  export type Component_categoryCountOutputTypeCountComponentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: componentsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model components
   */

  export type AggregateComponents = {
    _count: ComponentsCountAggregateOutputType | null
    _avg: ComponentsAvgAggregateOutputType | null
    _sum: ComponentsSumAggregateOutputType | null
    _min: ComponentsMinAggregateOutputType | null
    _max: ComponentsMaxAggregateOutputType | null
  }

  export type ComponentsAvgAggregateOutputType = {
    component_id: number | null
    meal_id: number | null
    before_cook_weight_g: Decimal | null
    after_cook_weight_g: Decimal | null
    category_id: number | null
  }

  export type ComponentsSumAggregateOutputType = {
    component_id: number | null
    meal_id: number | null
    before_cook_weight_g: Decimal | null
    after_cook_weight_g: Decimal | null
    category_id: number | null
  }

  export type ComponentsMinAggregateOutputType = {
    component_id: number | null
    meal_id: number | null
    component_name: string | null
    before_cook_weight_g: Decimal | null
    after_cook_weight_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
    category_id: number | null
  }

  export type ComponentsMaxAggregateOutputType = {
    component_id: number | null
    meal_id: number | null
    component_name: string | null
    before_cook_weight_g: Decimal | null
    after_cook_weight_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
    category_id: number | null
  }

  export type ComponentsCountAggregateOutputType = {
    component_id: number
    meal_id: number
    component_name: number
    before_cook_weight_g: number
    after_cook_weight_g: number
    created_at: number
    updated_at: number
    category_id: number
    _all: number
  }


  export type ComponentsAvgAggregateInputType = {
    component_id?: true
    meal_id?: true
    before_cook_weight_g?: true
    after_cook_weight_g?: true
    category_id?: true
  }

  export type ComponentsSumAggregateInputType = {
    component_id?: true
    meal_id?: true
    before_cook_weight_g?: true
    after_cook_weight_g?: true
    category_id?: true
  }

  export type ComponentsMinAggregateInputType = {
    component_id?: true
    meal_id?: true
    component_name?: true
    before_cook_weight_g?: true
    after_cook_weight_g?: true
    created_at?: true
    updated_at?: true
    category_id?: true
  }

  export type ComponentsMaxAggregateInputType = {
    component_id?: true
    meal_id?: true
    component_name?: true
    before_cook_weight_g?: true
    after_cook_weight_g?: true
    created_at?: true
    updated_at?: true
    category_id?: true
  }

  export type ComponentsCountAggregateInputType = {
    component_id?: true
    meal_id?: true
    component_name?: true
    before_cook_weight_g?: true
    after_cook_weight_g?: true
    created_at?: true
    updated_at?: true
    category_id?: true
    _all?: true
  }

  export type ComponentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which components to aggregate.
     */
    where?: componentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of components to fetch.
     */
    orderBy?: componentsOrderByWithRelationInput | componentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: componentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned components
    **/
    _count?: true | ComponentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComponentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComponentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComponentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComponentsMaxAggregateInputType
  }

  export type GetComponentsAggregateType<T extends ComponentsAggregateArgs> = {
        [P in keyof T & keyof AggregateComponents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComponents[P]>
      : GetScalarType<T[P], AggregateComponents[P]>
  }




  export type componentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: componentsWhereInput
    orderBy?: componentsOrderByWithAggregationInput | componentsOrderByWithAggregationInput[]
    by: ComponentsScalarFieldEnum[] | ComponentsScalarFieldEnum
    having?: componentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComponentsCountAggregateInputType | true
    _avg?: ComponentsAvgAggregateInputType
    _sum?: ComponentsSumAggregateInputType
    _min?: ComponentsMinAggregateInputType
    _max?: ComponentsMaxAggregateInputType
  }

  export type ComponentsGroupByOutputType = {
    component_id: number
    meal_id: number | null
    component_name: string
    before_cook_weight_g: Decimal | null
    after_cook_weight_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
    category_id: number | null
    _count: ComponentsCountAggregateOutputType | null
    _avg: ComponentsAvgAggregateOutputType | null
    _sum: ComponentsSumAggregateOutputType | null
    _min: ComponentsMinAggregateOutputType | null
    _max: ComponentsMaxAggregateOutputType | null
  }

  type GetComponentsGroupByPayload<T extends componentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComponentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComponentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComponentsGroupByOutputType[P]>
            : GetScalarType<T[P], ComponentsGroupByOutputType[P]>
        }
      >
    >


  export type componentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    component_id?: boolean
    meal_id?: boolean
    component_name?: boolean
    before_cook_weight_g?: boolean
    after_cook_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    category_id?: boolean
    meals?: boolean | components$mealsArgs<ExtArgs>
    recipe_ingredients?: boolean | components$recipe_ingredientsArgs<ExtArgs>
    component_portions?: boolean | components$component_portionsArgs<ExtArgs>
    category?: boolean | components$categoryArgs<ExtArgs>
    _count?: boolean | ComponentsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["components"]>

  export type componentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    component_id?: boolean
    meal_id?: boolean
    component_name?: boolean
    before_cook_weight_g?: boolean
    after_cook_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    category_id?: boolean
    meals?: boolean | components$mealsArgs<ExtArgs>
    category?: boolean | components$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["components"]>

  export type componentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    component_id?: boolean
    meal_id?: boolean
    component_name?: boolean
    before_cook_weight_g?: boolean
    after_cook_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    category_id?: boolean
    meals?: boolean | components$mealsArgs<ExtArgs>
    category?: boolean | components$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["components"]>

  export type componentsSelectScalar = {
    component_id?: boolean
    meal_id?: boolean
    component_name?: boolean
    before_cook_weight_g?: boolean
    after_cook_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    category_id?: boolean
  }

  export type componentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"component_id" | "meal_id" | "component_name" | "before_cook_weight_g" | "after_cook_weight_g" | "created_at" | "updated_at" | "category_id", ExtArgs["result"]["components"]>
  export type componentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meals?: boolean | components$mealsArgs<ExtArgs>
    recipe_ingredients?: boolean | components$recipe_ingredientsArgs<ExtArgs>
    component_portions?: boolean | components$component_portionsArgs<ExtArgs>
    category?: boolean | components$categoryArgs<ExtArgs>
    _count?: boolean | ComponentsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type componentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meals?: boolean | components$mealsArgs<ExtArgs>
    category?: boolean | components$categoryArgs<ExtArgs>
  }
  export type componentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meals?: boolean | components$mealsArgs<ExtArgs>
    category?: boolean | components$categoryArgs<ExtArgs>
  }

  export type $componentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "components"
    objects: {
      meals: Prisma.$mealsPayload<ExtArgs> | null
      recipe_ingredients: Prisma.$recipe_ingredientsPayload<ExtArgs>[]
      component_portions: Prisma.$component_portionsPayload<ExtArgs>[]
      category: Prisma.$component_categoryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      component_id: number
      meal_id: number | null
      component_name: string
      before_cook_weight_g: Prisma.Decimal | null
      after_cook_weight_g: Prisma.Decimal | null
      created_at: Date | null
      updated_at: Date | null
      category_id: number | null
    }, ExtArgs["result"]["components"]>
    composites: {}
  }

  type componentsGetPayload<S extends boolean | null | undefined | componentsDefaultArgs> = $Result.GetResult<Prisma.$componentsPayload, S>

  type componentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<componentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComponentsCountAggregateInputType | true
    }

  export interface componentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['components'], meta: { name: 'components' } }
    /**
     * Find zero or one Components that matches the filter.
     * @param {componentsFindUniqueArgs} args - Arguments to find a Components
     * @example
     * // Get one Components
     * const components = await prisma.components.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends componentsFindUniqueArgs>(args: SelectSubset<T, componentsFindUniqueArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Components that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {componentsFindUniqueOrThrowArgs} args - Arguments to find a Components
     * @example
     * // Get one Components
     * const components = await prisma.components.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends componentsFindUniqueOrThrowArgs>(args: SelectSubset<T, componentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Components that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {componentsFindFirstArgs} args - Arguments to find a Components
     * @example
     * // Get one Components
     * const components = await prisma.components.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends componentsFindFirstArgs>(args?: SelectSubset<T, componentsFindFirstArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Components that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {componentsFindFirstOrThrowArgs} args - Arguments to find a Components
     * @example
     * // Get one Components
     * const components = await prisma.components.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends componentsFindFirstOrThrowArgs>(args?: SelectSubset<T, componentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Components that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {componentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Components
     * const components = await prisma.components.findMany()
     * 
     * // Get first 10 Components
     * const components = await prisma.components.findMany({ take: 10 })
     * 
     * // Only select the `component_id`
     * const componentsWithComponent_idOnly = await prisma.components.findMany({ select: { component_id: true } })
     * 
     */
    findMany<T extends componentsFindManyArgs>(args?: SelectSubset<T, componentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Components.
     * @param {componentsCreateArgs} args - Arguments to create a Components.
     * @example
     * // Create one Components
     * const Components = await prisma.components.create({
     *   data: {
     *     // ... data to create a Components
     *   }
     * })
     * 
     */
    create<T extends componentsCreateArgs>(args: SelectSubset<T, componentsCreateArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Components.
     * @param {componentsCreateManyArgs} args - Arguments to create many Components.
     * @example
     * // Create many Components
     * const components = await prisma.components.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends componentsCreateManyArgs>(args?: SelectSubset<T, componentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Components and returns the data saved in the database.
     * @param {componentsCreateManyAndReturnArgs} args - Arguments to create many Components.
     * @example
     * // Create many Components
     * const components = await prisma.components.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Components and only return the `component_id`
     * const componentsWithComponent_idOnly = await prisma.components.createManyAndReturn({
     *   select: { component_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends componentsCreateManyAndReturnArgs>(args?: SelectSubset<T, componentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Components.
     * @param {componentsDeleteArgs} args - Arguments to delete one Components.
     * @example
     * // Delete one Components
     * const Components = await prisma.components.delete({
     *   where: {
     *     // ... filter to delete one Components
     *   }
     * })
     * 
     */
    delete<T extends componentsDeleteArgs>(args: SelectSubset<T, componentsDeleteArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Components.
     * @param {componentsUpdateArgs} args - Arguments to update one Components.
     * @example
     * // Update one Components
     * const components = await prisma.components.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends componentsUpdateArgs>(args: SelectSubset<T, componentsUpdateArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Components.
     * @param {componentsDeleteManyArgs} args - Arguments to filter Components to delete.
     * @example
     * // Delete a few Components
     * const { count } = await prisma.components.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends componentsDeleteManyArgs>(args?: SelectSubset<T, componentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {componentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Components
     * const components = await prisma.components.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends componentsUpdateManyArgs>(args: SelectSubset<T, componentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Components and returns the data updated in the database.
     * @param {componentsUpdateManyAndReturnArgs} args - Arguments to update many Components.
     * @example
     * // Update many Components
     * const components = await prisma.components.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Components and only return the `component_id`
     * const componentsWithComponent_idOnly = await prisma.components.updateManyAndReturn({
     *   select: { component_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends componentsUpdateManyAndReturnArgs>(args: SelectSubset<T, componentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Components.
     * @param {componentsUpsertArgs} args - Arguments to update or create a Components.
     * @example
     * // Update or create a Components
     * const components = await prisma.components.upsert({
     *   create: {
     *     // ... data to create a Components
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Components we want to update
     *   }
     * })
     */
    upsert<T extends componentsUpsertArgs>(args: SelectSubset<T, componentsUpsertArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {componentsCountArgs} args - Arguments to filter Components to count.
     * @example
     * // Count the number of Components
     * const count = await prisma.components.count({
     *   where: {
     *     // ... the filter for the Components we want to count
     *   }
     * })
    **/
    count<T extends componentsCountArgs>(
      args?: Subset<T, componentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComponentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComponentsAggregateArgs>(args: Subset<T, ComponentsAggregateArgs>): Prisma.PrismaPromise<GetComponentsAggregateType<T>>

    /**
     * Group by Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {componentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends componentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: componentsGroupByArgs['orderBy'] }
        : { orderBy?: componentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, componentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComponentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the components model
   */
  readonly fields: componentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for components.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__componentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meals<T extends components$mealsArgs<ExtArgs> = {}>(args?: Subset<T, components$mealsArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recipe_ingredients<T extends components$recipe_ingredientsArgs<ExtArgs> = {}>(args?: Subset<T, components$recipe_ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    component_portions<T extends components$component_portionsArgs<ExtArgs> = {}>(args?: Subset<T, components$component_portionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends components$categoryArgs<ExtArgs> = {}>(args?: Subset<T, components$categoryArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the components model
   */
  interface componentsFieldRefs {
    readonly component_id: FieldRef<"components", 'Int'>
    readonly meal_id: FieldRef<"components", 'Int'>
    readonly component_name: FieldRef<"components", 'String'>
    readonly before_cook_weight_g: FieldRef<"components", 'Decimal'>
    readonly after_cook_weight_g: FieldRef<"components", 'Decimal'>
    readonly created_at: FieldRef<"components", 'DateTime'>
    readonly updated_at: FieldRef<"components", 'DateTime'>
    readonly category_id: FieldRef<"components", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * components findUnique
   */
  export type componentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * Filter, which components to fetch.
     */
    where: componentsWhereUniqueInput
  }

  /**
   * components findUniqueOrThrow
   */
  export type componentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * Filter, which components to fetch.
     */
    where: componentsWhereUniqueInput
  }

  /**
   * components findFirst
   */
  export type componentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * Filter, which components to fetch.
     */
    where?: componentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of components to fetch.
     */
    orderBy?: componentsOrderByWithRelationInput | componentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for components.
     */
    cursor?: componentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of components.
     */
    distinct?: ComponentsScalarFieldEnum | ComponentsScalarFieldEnum[]
  }

  /**
   * components findFirstOrThrow
   */
  export type componentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * Filter, which components to fetch.
     */
    where?: componentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of components to fetch.
     */
    orderBy?: componentsOrderByWithRelationInput | componentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for components.
     */
    cursor?: componentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of components.
     */
    distinct?: ComponentsScalarFieldEnum | ComponentsScalarFieldEnum[]
  }

  /**
   * components findMany
   */
  export type componentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * Filter, which components to fetch.
     */
    where?: componentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of components to fetch.
     */
    orderBy?: componentsOrderByWithRelationInput | componentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing components.
     */
    cursor?: componentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` components.
     */
    skip?: number
    distinct?: ComponentsScalarFieldEnum | ComponentsScalarFieldEnum[]
  }

  /**
   * components create
   */
  export type componentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * The data needed to create a components.
     */
    data: XOR<componentsCreateInput, componentsUncheckedCreateInput>
  }

  /**
   * components createMany
   */
  export type componentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many components.
     */
    data: componentsCreateManyInput | componentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * components createManyAndReturn
   */
  export type componentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * The data used to create many components.
     */
    data: componentsCreateManyInput | componentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * components update
   */
  export type componentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * The data needed to update a components.
     */
    data: XOR<componentsUpdateInput, componentsUncheckedUpdateInput>
    /**
     * Choose, which components to update.
     */
    where: componentsWhereUniqueInput
  }

  /**
   * components updateMany
   */
  export type componentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update components.
     */
    data: XOR<componentsUpdateManyMutationInput, componentsUncheckedUpdateManyInput>
    /**
     * Filter which components to update
     */
    where?: componentsWhereInput
    /**
     * Limit how many components to update.
     */
    limit?: number
  }

  /**
   * components updateManyAndReturn
   */
  export type componentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * The data used to update components.
     */
    data: XOR<componentsUpdateManyMutationInput, componentsUncheckedUpdateManyInput>
    /**
     * Filter which components to update
     */
    where?: componentsWhereInput
    /**
     * Limit how many components to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * components upsert
   */
  export type componentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * The filter to search for the components to update in case it exists.
     */
    where: componentsWhereUniqueInput
    /**
     * In case the components found by the `where` argument doesn't exist, create a new components with this data.
     */
    create: XOR<componentsCreateInput, componentsUncheckedCreateInput>
    /**
     * In case the components was found with the provided `where` argument, update it with this data.
     */
    update: XOR<componentsUpdateInput, componentsUncheckedUpdateInput>
  }

  /**
   * components delete
   */
  export type componentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    /**
     * Filter which components to delete.
     */
    where: componentsWhereUniqueInput
  }

  /**
   * components deleteMany
   */
  export type componentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which components to delete
     */
    where?: componentsWhereInput
    /**
     * Limit how many components to delete.
     */
    limit?: number
  }

  /**
   * components.meals
   */
  export type components$mealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    where?: mealsWhereInput
  }

  /**
   * components.recipe_ingredients
   */
  export type components$recipe_ingredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    where?: recipe_ingredientsWhereInput
    orderBy?: recipe_ingredientsOrderByWithRelationInput | recipe_ingredientsOrderByWithRelationInput[]
    cursor?: recipe_ingredientsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }

  /**
   * components.component_portions
   */
  export type components$component_portionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    where?: component_portionsWhereInput
    orderBy?: component_portionsOrderByWithRelationInput | component_portionsOrderByWithRelationInput[]
    cursor?: component_portionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Component_portionsScalarFieldEnum | Component_portionsScalarFieldEnum[]
  }

  /**
   * components.category
   */
  export type components$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    where?: component_categoryWhereInput
  }

  /**
   * components without action
   */
  export type componentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
  }


  /**
   * Model component_portions
   */

  export type AggregateComponent_portions = {
    _count: Component_portionsCountAggregateOutputType | null
    _avg: Component_portionsAvgAggregateOutputType | null
    _sum: Component_portionsSumAggregateOutputType | null
    _min: Component_portionsMinAggregateOutputType | null
    _max: Component_portionsMaxAggregateOutputType | null
  }

  export type Component_portionsAvgAggregateOutputType = {
    portion_id: number | null
    component_id: number | null
    total_weight_g: Decimal | null
  }

  export type Component_portionsSumAggregateOutputType = {
    portion_id: number | null
    component_id: number | null
    total_weight_g: Decimal | null
  }

  export type Component_portionsMinAggregateOutputType = {
    portion_id: number | null
    component_id: number | null
    label: string | null
    total_weight_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Component_portionsMaxAggregateOutputType = {
    portion_id: number | null
    component_id: number | null
    label: string | null
    total_weight_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Component_portionsCountAggregateOutputType = {
    portion_id: number
    component_id: number
    label: number
    total_weight_g: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Component_portionsAvgAggregateInputType = {
    portion_id?: true
    component_id?: true
    total_weight_g?: true
  }

  export type Component_portionsSumAggregateInputType = {
    portion_id?: true
    component_id?: true
    total_weight_g?: true
  }

  export type Component_portionsMinAggregateInputType = {
    portion_id?: true
    component_id?: true
    label?: true
    total_weight_g?: true
    created_at?: true
    updated_at?: true
  }

  export type Component_portionsMaxAggregateInputType = {
    portion_id?: true
    component_id?: true
    label?: true
    total_weight_g?: true
    created_at?: true
    updated_at?: true
  }

  export type Component_portionsCountAggregateInputType = {
    portion_id?: true
    component_id?: true
    label?: true
    total_weight_g?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Component_portionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which component_portions to aggregate.
     */
    where?: component_portionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_portions to fetch.
     */
    orderBy?: component_portionsOrderByWithRelationInput | component_portionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: component_portionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_portions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_portions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned component_portions
    **/
    _count?: true | Component_portionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Component_portionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Component_portionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Component_portionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Component_portionsMaxAggregateInputType
  }

  export type GetComponent_portionsAggregateType<T extends Component_portionsAggregateArgs> = {
        [P in keyof T & keyof AggregateComponent_portions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComponent_portions[P]>
      : GetScalarType<T[P], AggregateComponent_portions[P]>
  }




  export type component_portionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: component_portionsWhereInput
    orderBy?: component_portionsOrderByWithAggregationInput | component_portionsOrderByWithAggregationInput[]
    by: Component_portionsScalarFieldEnum[] | Component_portionsScalarFieldEnum
    having?: component_portionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Component_portionsCountAggregateInputType | true
    _avg?: Component_portionsAvgAggregateInputType
    _sum?: Component_portionsSumAggregateInputType
    _min?: Component_portionsMinAggregateInputType
    _max?: Component_portionsMaxAggregateInputType
  }

  export type Component_portionsGroupByOutputType = {
    portion_id: number
    component_id: number
    label: string
    total_weight_g: Decimal
    created_at: Date | null
    updated_at: Date | null
    _count: Component_portionsCountAggregateOutputType | null
    _avg: Component_portionsAvgAggregateOutputType | null
    _sum: Component_portionsSumAggregateOutputType | null
    _min: Component_portionsMinAggregateOutputType | null
    _max: Component_portionsMaxAggregateOutputType | null
  }

  type GetComponent_portionsGroupByPayload<T extends component_portionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Component_portionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Component_portionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Component_portionsGroupByOutputType[P]>
            : GetScalarType<T[P], Component_portionsGroupByOutputType[P]>
        }
      >
    >


  export type component_portionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    portion_id?: boolean
    component_id?: boolean
    label?: boolean
    total_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    components?: boolean | componentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["component_portions"]>

  export type component_portionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    portion_id?: boolean
    component_id?: boolean
    label?: boolean
    total_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    components?: boolean | componentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["component_portions"]>

  export type component_portionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    portion_id?: boolean
    component_id?: boolean
    label?: boolean
    total_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    components?: boolean | componentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["component_portions"]>

  export type component_portionsSelectScalar = {
    portion_id?: boolean
    component_id?: boolean
    label?: boolean
    total_weight_g?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type component_portionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"portion_id" | "component_id" | "label" | "total_weight_g" | "created_at" | "updated_at", ExtArgs["result"]["component_portions"]>
  export type component_portionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | componentsDefaultArgs<ExtArgs>
  }
  export type component_portionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | componentsDefaultArgs<ExtArgs>
  }
  export type component_portionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | componentsDefaultArgs<ExtArgs>
  }

  export type $component_portionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "component_portions"
    objects: {
      components: Prisma.$componentsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      portion_id: number
      component_id: number
      label: string
      total_weight_g: Prisma.Decimal
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["component_portions"]>
    composites: {}
  }

  type component_portionsGetPayload<S extends boolean | null | undefined | component_portionsDefaultArgs> = $Result.GetResult<Prisma.$component_portionsPayload, S>

  type component_portionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<component_portionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Component_portionsCountAggregateInputType | true
    }

  export interface component_portionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['component_portions'], meta: { name: 'component_portions' } }
    /**
     * Find zero or one Component_portions that matches the filter.
     * @param {component_portionsFindUniqueArgs} args - Arguments to find a Component_portions
     * @example
     * // Get one Component_portions
     * const component_portions = await prisma.component_portions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends component_portionsFindUniqueArgs>(args: SelectSubset<T, component_portionsFindUniqueArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Component_portions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {component_portionsFindUniqueOrThrowArgs} args - Arguments to find a Component_portions
     * @example
     * // Get one Component_portions
     * const component_portions = await prisma.component_portions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends component_portionsFindUniqueOrThrowArgs>(args: SelectSubset<T, component_portionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Component_portions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_portionsFindFirstArgs} args - Arguments to find a Component_portions
     * @example
     * // Get one Component_portions
     * const component_portions = await prisma.component_portions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends component_portionsFindFirstArgs>(args?: SelectSubset<T, component_portionsFindFirstArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Component_portions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_portionsFindFirstOrThrowArgs} args - Arguments to find a Component_portions
     * @example
     * // Get one Component_portions
     * const component_portions = await prisma.component_portions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends component_portionsFindFirstOrThrowArgs>(args?: SelectSubset<T, component_portionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Component_portions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_portionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Component_portions
     * const component_portions = await prisma.component_portions.findMany()
     * 
     * // Get first 10 Component_portions
     * const component_portions = await prisma.component_portions.findMany({ take: 10 })
     * 
     * // Only select the `portion_id`
     * const component_portionsWithPortion_idOnly = await prisma.component_portions.findMany({ select: { portion_id: true } })
     * 
     */
    findMany<T extends component_portionsFindManyArgs>(args?: SelectSubset<T, component_portionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Component_portions.
     * @param {component_portionsCreateArgs} args - Arguments to create a Component_portions.
     * @example
     * // Create one Component_portions
     * const Component_portions = await prisma.component_portions.create({
     *   data: {
     *     // ... data to create a Component_portions
     *   }
     * })
     * 
     */
    create<T extends component_portionsCreateArgs>(args: SelectSubset<T, component_portionsCreateArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Component_portions.
     * @param {component_portionsCreateManyArgs} args - Arguments to create many Component_portions.
     * @example
     * // Create many Component_portions
     * const component_portions = await prisma.component_portions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends component_portionsCreateManyArgs>(args?: SelectSubset<T, component_portionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Component_portions and returns the data saved in the database.
     * @param {component_portionsCreateManyAndReturnArgs} args - Arguments to create many Component_portions.
     * @example
     * // Create many Component_portions
     * const component_portions = await prisma.component_portions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Component_portions and only return the `portion_id`
     * const component_portionsWithPortion_idOnly = await prisma.component_portions.createManyAndReturn({
     *   select: { portion_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends component_portionsCreateManyAndReturnArgs>(args?: SelectSubset<T, component_portionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Component_portions.
     * @param {component_portionsDeleteArgs} args - Arguments to delete one Component_portions.
     * @example
     * // Delete one Component_portions
     * const Component_portions = await prisma.component_portions.delete({
     *   where: {
     *     // ... filter to delete one Component_portions
     *   }
     * })
     * 
     */
    delete<T extends component_portionsDeleteArgs>(args: SelectSubset<T, component_portionsDeleteArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Component_portions.
     * @param {component_portionsUpdateArgs} args - Arguments to update one Component_portions.
     * @example
     * // Update one Component_portions
     * const component_portions = await prisma.component_portions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends component_portionsUpdateArgs>(args: SelectSubset<T, component_portionsUpdateArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Component_portions.
     * @param {component_portionsDeleteManyArgs} args - Arguments to filter Component_portions to delete.
     * @example
     * // Delete a few Component_portions
     * const { count } = await prisma.component_portions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends component_portionsDeleteManyArgs>(args?: SelectSubset<T, component_portionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Component_portions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_portionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Component_portions
     * const component_portions = await prisma.component_portions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends component_portionsUpdateManyArgs>(args: SelectSubset<T, component_portionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Component_portions and returns the data updated in the database.
     * @param {component_portionsUpdateManyAndReturnArgs} args - Arguments to update many Component_portions.
     * @example
     * // Update many Component_portions
     * const component_portions = await prisma.component_portions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Component_portions and only return the `portion_id`
     * const component_portionsWithPortion_idOnly = await prisma.component_portions.updateManyAndReturn({
     *   select: { portion_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends component_portionsUpdateManyAndReturnArgs>(args: SelectSubset<T, component_portionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Component_portions.
     * @param {component_portionsUpsertArgs} args - Arguments to update or create a Component_portions.
     * @example
     * // Update or create a Component_portions
     * const component_portions = await prisma.component_portions.upsert({
     *   create: {
     *     // ... data to create a Component_portions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Component_portions we want to update
     *   }
     * })
     */
    upsert<T extends component_portionsUpsertArgs>(args: SelectSubset<T, component_portionsUpsertArgs<ExtArgs>>): Prisma__component_portionsClient<$Result.GetResult<Prisma.$component_portionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Component_portions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_portionsCountArgs} args - Arguments to filter Component_portions to count.
     * @example
     * // Count the number of Component_portions
     * const count = await prisma.component_portions.count({
     *   where: {
     *     // ... the filter for the Component_portions we want to count
     *   }
     * })
    **/
    count<T extends component_portionsCountArgs>(
      args?: Subset<T, component_portionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Component_portionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Component_portions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Component_portionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Component_portionsAggregateArgs>(args: Subset<T, Component_portionsAggregateArgs>): Prisma.PrismaPromise<GetComponent_portionsAggregateType<T>>

    /**
     * Group by Component_portions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_portionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends component_portionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: component_portionsGroupByArgs['orderBy'] }
        : { orderBy?: component_portionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, component_portionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComponent_portionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the component_portions model
   */
  readonly fields: component_portionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for component_portions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__component_portionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    components<T extends componentsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, componentsDefaultArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the component_portions model
   */
  interface component_portionsFieldRefs {
    readonly portion_id: FieldRef<"component_portions", 'Int'>
    readonly component_id: FieldRef<"component_portions", 'Int'>
    readonly label: FieldRef<"component_portions", 'String'>
    readonly total_weight_g: FieldRef<"component_portions", 'Decimal'>
    readonly created_at: FieldRef<"component_portions", 'DateTime'>
    readonly updated_at: FieldRef<"component_portions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * component_portions findUnique
   */
  export type component_portionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * Filter, which component_portions to fetch.
     */
    where: component_portionsWhereUniqueInput
  }

  /**
   * component_portions findUniqueOrThrow
   */
  export type component_portionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * Filter, which component_portions to fetch.
     */
    where: component_portionsWhereUniqueInput
  }

  /**
   * component_portions findFirst
   */
  export type component_portionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * Filter, which component_portions to fetch.
     */
    where?: component_portionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_portions to fetch.
     */
    orderBy?: component_portionsOrderByWithRelationInput | component_portionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for component_portions.
     */
    cursor?: component_portionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_portions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_portions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of component_portions.
     */
    distinct?: Component_portionsScalarFieldEnum | Component_portionsScalarFieldEnum[]
  }

  /**
   * component_portions findFirstOrThrow
   */
  export type component_portionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * Filter, which component_portions to fetch.
     */
    where?: component_portionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_portions to fetch.
     */
    orderBy?: component_portionsOrderByWithRelationInput | component_portionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for component_portions.
     */
    cursor?: component_portionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_portions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_portions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of component_portions.
     */
    distinct?: Component_portionsScalarFieldEnum | Component_portionsScalarFieldEnum[]
  }

  /**
   * component_portions findMany
   */
  export type component_portionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * Filter, which component_portions to fetch.
     */
    where?: component_portionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_portions to fetch.
     */
    orderBy?: component_portionsOrderByWithRelationInput | component_portionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing component_portions.
     */
    cursor?: component_portionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_portions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_portions.
     */
    skip?: number
    distinct?: Component_portionsScalarFieldEnum | Component_portionsScalarFieldEnum[]
  }

  /**
   * component_portions create
   */
  export type component_portionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * The data needed to create a component_portions.
     */
    data: XOR<component_portionsCreateInput, component_portionsUncheckedCreateInput>
  }

  /**
   * component_portions createMany
   */
  export type component_portionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many component_portions.
     */
    data: component_portionsCreateManyInput | component_portionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * component_portions createManyAndReturn
   */
  export type component_portionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * The data used to create many component_portions.
     */
    data: component_portionsCreateManyInput | component_portionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * component_portions update
   */
  export type component_portionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * The data needed to update a component_portions.
     */
    data: XOR<component_portionsUpdateInput, component_portionsUncheckedUpdateInput>
    /**
     * Choose, which component_portions to update.
     */
    where: component_portionsWhereUniqueInput
  }

  /**
   * component_portions updateMany
   */
  export type component_portionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update component_portions.
     */
    data: XOR<component_portionsUpdateManyMutationInput, component_portionsUncheckedUpdateManyInput>
    /**
     * Filter which component_portions to update
     */
    where?: component_portionsWhereInput
    /**
     * Limit how many component_portions to update.
     */
    limit?: number
  }

  /**
   * component_portions updateManyAndReturn
   */
  export type component_portionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * The data used to update component_portions.
     */
    data: XOR<component_portionsUpdateManyMutationInput, component_portionsUncheckedUpdateManyInput>
    /**
     * Filter which component_portions to update
     */
    where?: component_portionsWhereInput
    /**
     * Limit how many component_portions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * component_portions upsert
   */
  export type component_portionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * The filter to search for the component_portions to update in case it exists.
     */
    where: component_portionsWhereUniqueInput
    /**
     * In case the component_portions found by the `where` argument doesn't exist, create a new component_portions with this data.
     */
    create: XOR<component_portionsCreateInput, component_portionsUncheckedCreateInput>
    /**
     * In case the component_portions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<component_portionsUpdateInput, component_portionsUncheckedUpdateInput>
  }

  /**
   * component_portions delete
   */
  export type component_portionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
    /**
     * Filter which component_portions to delete.
     */
    where: component_portionsWhereUniqueInput
  }

  /**
   * component_portions deleteMany
   */
  export type component_portionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which component_portions to delete
     */
    where?: component_portionsWhereInput
    /**
     * Limit how many component_portions to delete.
     */
    limit?: number
  }

  /**
   * component_portions without action
   */
  export type component_portionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_portions
     */
    select?: component_portionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_portions
     */
    omit?: component_portionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_portionsInclude<ExtArgs> | null
  }


  /**
   * Model ingredients
   */

  export type AggregateIngredients = {
    _count: IngredientsCountAggregateOutputType | null
    _avg: IngredientsAvgAggregateOutputType | null
    _sum: IngredientsSumAggregateOutputType | null
    _min: IngredientsMinAggregateOutputType | null
    _max: IngredientsMaxAggregateOutputType | null
  }

  export type IngredientsAvgAggregateOutputType = {
    ingredient_id: number | null
    calories_per_100g: Decimal | null
    fat_g: Decimal | null
    protein_g: Decimal | null
    carbohydrates_g: Decimal | null
  }

  export type IngredientsSumAggregateOutputType = {
    ingredient_id: number | null
    calories_per_100g: Decimal | null
    fat_g: Decimal | null
    protein_g: Decimal | null
    carbohydrates_g: Decimal | null
  }

  export type IngredientsMinAggregateOutputType = {
    ingredient_id: number | null
    ingredient_name: string | null
    default_unit: string | null
    calories_per_100g: Decimal | null
    fat_g: Decimal | null
    protein_g: Decimal | null
    carbohydrates_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IngredientsMaxAggregateOutputType = {
    ingredient_id: number | null
    ingredient_name: string | null
    default_unit: string | null
    calories_per_100g: Decimal | null
    fat_g: Decimal | null
    protein_g: Decimal | null
    carbohydrates_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IngredientsCountAggregateOutputType = {
    ingredient_id: number
    ingredient_name: number
    default_unit: number
    calories_per_100g: number
    fat_g: number
    protein_g: number
    carbohydrates_g: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type IngredientsAvgAggregateInputType = {
    ingredient_id?: true
    calories_per_100g?: true
    fat_g?: true
    protein_g?: true
    carbohydrates_g?: true
  }

  export type IngredientsSumAggregateInputType = {
    ingredient_id?: true
    calories_per_100g?: true
    fat_g?: true
    protein_g?: true
    carbohydrates_g?: true
  }

  export type IngredientsMinAggregateInputType = {
    ingredient_id?: true
    ingredient_name?: true
    default_unit?: true
    calories_per_100g?: true
    fat_g?: true
    protein_g?: true
    carbohydrates_g?: true
    created_at?: true
    updated_at?: true
  }

  export type IngredientsMaxAggregateInputType = {
    ingredient_id?: true
    ingredient_name?: true
    default_unit?: true
    calories_per_100g?: true
    fat_g?: true
    protein_g?: true
    carbohydrates_g?: true
    created_at?: true
    updated_at?: true
  }

  export type IngredientsCountAggregateInputType = {
    ingredient_id?: true
    ingredient_name?: true
    default_unit?: true
    calories_per_100g?: true
    fat_g?: true
    protein_g?: true
    carbohydrates_g?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type IngredientsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ingredients to aggregate.
     */
    where?: ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ingredients to fetch.
     */
    orderBy?: ingredientsOrderByWithRelationInput | ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ingredients
    **/
    _count?: true | IngredientsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IngredientsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IngredientsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IngredientsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IngredientsMaxAggregateInputType
  }

  export type GetIngredientsAggregateType<T extends IngredientsAggregateArgs> = {
        [P in keyof T & keyof AggregateIngredients]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngredients[P]>
      : GetScalarType<T[P], AggregateIngredients[P]>
  }




  export type ingredientsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ingredientsWhereInput
    orderBy?: ingredientsOrderByWithAggregationInput | ingredientsOrderByWithAggregationInput[]
    by: IngredientsScalarFieldEnum[] | IngredientsScalarFieldEnum
    having?: ingredientsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IngredientsCountAggregateInputType | true
    _avg?: IngredientsAvgAggregateInputType
    _sum?: IngredientsSumAggregateInputType
    _min?: IngredientsMinAggregateInputType
    _max?: IngredientsMaxAggregateInputType
  }

  export type IngredientsGroupByOutputType = {
    ingredient_id: number
    ingredient_name: string
    default_unit: string
    calories_per_100g: Decimal
    fat_g: Decimal
    protein_g: Decimal
    carbohydrates_g: Decimal
    created_at: Date | null
    updated_at: Date | null
    _count: IngredientsCountAggregateOutputType | null
    _avg: IngredientsAvgAggregateOutputType | null
    _sum: IngredientsSumAggregateOutputType | null
    _min: IngredientsMinAggregateOutputType | null
    _max: IngredientsMaxAggregateOutputType | null
  }

  type GetIngredientsGroupByPayload<T extends ingredientsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IngredientsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IngredientsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngredientsGroupByOutputType[P]>
            : GetScalarType<T[P], IngredientsGroupByOutputType[P]>
        }
      >
    >


  export type ingredientsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ingredient_id?: boolean
    ingredient_name?: boolean
    default_unit?: boolean
    calories_per_100g?: boolean
    fat_g?: boolean
    protein_g?: boolean
    carbohydrates_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    recipe_ingredients?: boolean | ingredients$recipe_ingredientsArgs<ExtArgs>
    _count?: boolean | IngredientsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingredients"]>

  export type ingredientsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ingredient_id?: boolean
    ingredient_name?: boolean
    default_unit?: boolean
    calories_per_100g?: boolean
    fat_g?: boolean
    protein_g?: boolean
    carbohydrates_g?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["ingredients"]>

  export type ingredientsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ingredient_id?: boolean
    ingredient_name?: boolean
    default_unit?: boolean
    calories_per_100g?: boolean
    fat_g?: boolean
    protein_g?: boolean
    carbohydrates_g?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["ingredients"]>

  export type ingredientsSelectScalar = {
    ingredient_id?: boolean
    ingredient_name?: boolean
    default_unit?: boolean
    calories_per_100g?: boolean
    fat_g?: boolean
    protein_g?: boolean
    carbohydrates_g?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ingredientsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ingredient_id" | "ingredient_name" | "default_unit" | "calories_per_100g" | "fat_g" | "protein_g" | "carbohydrates_g" | "created_at" | "updated_at", ExtArgs["result"]["ingredients"]>
  export type ingredientsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe_ingredients?: boolean | ingredients$recipe_ingredientsArgs<ExtArgs>
    _count?: boolean | IngredientsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ingredientsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ingredientsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ingredientsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ingredients"
    objects: {
      recipe_ingredients: Prisma.$recipe_ingredientsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      ingredient_id: number
      ingredient_name: string
      default_unit: string
      calories_per_100g: Prisma.Decimal
      fat_g: Prisma.Decimal
      protein_g: Prisma.Decimal
      carbohydrates_g: Prisma.Decimal
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["ingredients"]>
    composites: {}
  }

  type ingredientsGetPayload<S extends boolean | null | undefined | ingredientsDefaultArgs> = $Result.GetResult<Prisma.$ingredientsPayload, S>

  type ingredientsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ingredientsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IngredientsCountAggregateInputType | true
    }

  export interface ingredientsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ingredients'], meta: { name: 'ingredients' } }
    /**
     * Find zero or one Ingredients that matches the filter.
     * @param {ingredientsFindUniqueArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ingredientsFindUniqueArgs>(args: SelectSubset<T, ingredientsFindUniqueArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ingredients that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ingredientsFindUniqueOrThrowArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ingredientsFindUniqueOrThrowArgs>(args: SelectSubset<T, ingredientsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ingredientsFindFirstArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ingredientsFindFirstArgs>(args?: SelectSubset<T, ingredientsFindFirstArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ingredients that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ingredientsFindFirstOrThrowArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ingredientsFindFirstOrThrowArgs>(args?: SelectSubset<T, ingredientsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ingredientsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredients
     * const ingredients = await prisma.ingredients.findMany()
     * 
     * // Get first 10 Ingredients
     * const ingredients = await prisma.ingredients.findMany({ take: 10 })
     * 
     * // Only select the `ingredient_id`
     * const ingredientsWithIngredient_idOnly = await prisma.ingredients.findMany({ select: { ingredient_id: true } })
     * 
     */
    findMany<T extends ingredientsFindManyArgs>(args?: SelectSubset<T, ingredientsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ingredients.
     * @param {ingredientsCreateArgs} args - Arguments to create a Ingredients.
     * @example
     * // Create one Ingredients
     * const Ingredients = await prisma.ingredients.create({
     *   data: {
     *     // ... data to create a Ingredients
     *   }
     * })
     * 
     */
    create<T extends ingredientsCreateArgs>(args: SelectSubset<T, ingredientsCreateArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ingredients.
     * @param {ingredientsCreateManyArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredients = await prisma.ingredients.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ingredientsCreateManyArgs>(args?: SelectSubset<T, ingredientsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ingredients and returns the data saved in the database.
     * @param {ingredientsCreateManyAndReturnArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredients = await prisma.ingredients.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ingredients and only return the `ingredient_id`
     * const ingredientsWithIngredient_idOnly = await prisma.ingredients.createManyAndReturn({
     *   select: { ingredient_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ingredientsCreateManyAndReturnArgs>(args?: SelectSubset<T, ingredientsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ingredients.
     * @param {ingredientsDeleteArgs} args - Arguments to delete one Ingredients.
     * @example
     * // Delete one Ingredients
     * const Ingredients = await prisma.ingredients.delete({
     *   where: {
     *     // ... filter to delete one Ingredients
     *   }
     * })
     * 
     */
    delete<T extends ingredientsDeleteArgs>(args: SelectSubset<T, ingredientsDeleteArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ingredients.
     * @param {ingredientsUpdateArgs} args - Arguments to update one Ingredients.
     * @example
     * // Update one Ingredients
     * const ingredients = await prisma.ingredients.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ingredientsUpdateArgs>(args: SelectSubset<T, ingredientsUpdateArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ingredients.
     * @param {ingredientsDeleteManyArgs} args - Arguments to filter Ingredients to delete.
     * @example
     * // Delete a few Ingredients
     * const { count } = await prisma.ingredients.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ingredientsDeleteManyArgs>(args?: SelectSubset<T, ingredientsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ingredientsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredients
     * const ingredients = await prisma.ingredients.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ingredientsUpdateManyArgs>(args: SelectSubset<T, ingredientsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredients and returns the data updated in the database.
     * @param {ingredientsUpdateManyAndReturnArgs} args - Arguments to update many Ingredients.
     * @example
     * // Update many Ingredients
     * const ingredients = await prisma.ingredients.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ingredients and only return the `ingredient_id`
     * const ingredientsWithIngredient_idOnly = await prisma.ingredients.updateManyAndReturn({
     *   select: { ingredient_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ingredientsUpdateManyAndReturnArgs>(args: SelectSubset<T, ingredientsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ingredients.
     * @param {ingredientsUpsertArgs} args - Arguments to update or create a Ingredients.
     * @example
     * // Update or create a Ingredients
     * const ingredients = await prisma.ingredients.upsert({
     *   create: {
     *     // ... data to create a Ingredients
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredients we want to update
     *   }
     * })
     */
    upsert<T extends ingredientsUpsertArgs>(args: SelectSubset<T, ingredientsUpsertArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ingredientsCountArgs} args - Arguments to filter Ingredients to count.
     * @example
     * // Count the number of Ingredients
     * const count = await prisma.ingredients.count({
     *   where: {
     *     // ... the filter for the Ingredients we want to count
     *   }
     * })
    **/
    count<T extends ingredientsCountArgs>(
      args?: Subset<T, ingredientsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngredientsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IngredientsAggregateArgs>(args: Subset<T, IngredientsAggregateArgs>): Prisma.PrismaPromise<GetIngredientsAggregateType<T>>

    /**
     * Group by Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ingredientsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ingredientsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ingredientsGroupByArgs['orderBy'] }
        : { orderBy?: ingredientsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ingredientsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredientsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ingredients model
   */
  readonly fields: ingredientsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ingredients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ingredientsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipe_ingredients<T extends ingredients$recipe_ingredientsArgs<ExtArgs> = {}>(args?: Subset<T, ingredients$recipe_ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ingredients model
   */
  interface ingredientsFieldRefs {
    readonly ingredient_id: FieldRef<"ingredients", 'Int'>
    readonly ingredient_name: FieldRef<"ingredients", 'String'>
    readonly default_unit: FieldRef<"ingredients", 'String'>
    readonly calories_per_100g: FieldRef<"ingredients", 'Decimal'>
    readonly fat_g: FieldRef<"ingredients", 'Decimal'>
    readonly protein_g: FieldRef<"ingredients", 'Decimal'>
    readonly carbohydrates_g: FieldRef<"ingredients", 'Decimal'>
    readonly created_at: FieldRef<"ingredients", 'DateTime'>
    readonly updated_at: FieldRef<"ingredients", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ingredients findUnique
   */
  export type ingredientsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which ingredients to fetch.
     */
    where: ingredientsWhereUniqueInput
  }

  /**
   * ingredients findUniqueOrThrow
   */
  export type ingredientsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which ingredients to fetch.
     */
    where: ingredientsWhereUniqueInput
  }

  /**
   * ingredients findFirst
   */
  export type ingredientsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which ingredients to fetch.
     */
    where?: ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ingredients to fetch.
     */
    orderBy?: ingredientsOrderByWithRelationInput | ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ingredients.
     */
    cursor?: ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ingredients.
     */
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[]
  }

  /**
   * ingredients findFirstOrThrow
   */
  export type ingredientsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which ingredients to fetch.
     */
    where?: ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ingredients to fetch.
     */
    orderBy?: ingredientsOrderByWithRelationInput | ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ingredients.
     */
    cursor?: ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ingredients.
     */
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[]
  }

  /**
   * ingredients findMany
   */
  export type ingredientsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which ingredients to fetch.
     */
    where?: ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ingredients to fetch.
     */
    orderBy?: ingredientsOrderByWithRelationInput | ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ingredients.
     */
    cursor?: ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ingredients.
     */
    skip?: number
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[]
  }

  /**
   * ingredients create
   */
  export type ingredientsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * The data needed to create a ingredients.
     */
    data: XOR<ingredientsCreateInput, ingredientsUncheckedCreateInput>
  }

  /**
   * ingredients createMany
   */
  export type ingredientsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ingredients.
     */
    data: ingredientsCreateManyInput | ingredientsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ingredients createManyAndReturn
   */
  export type ingredientsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * The data used to create many ingredients.
     */
    data: ingredientsCreateManyInput | ingredientsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ingredients update
   */
  export type ingredientsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * The data needed to update a ingredients.
     */
    data: XOR<ingredientsUpdateInput, ingredientsUncheckedUpdateInput>
    /**
     * Choose, which ingredients to update.
     */
    where: ingredientsWhereUniqueInput
  }

  /**
   * ingredients updateMany
   */
  export type ingredientsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ingredients.
     */
    data: XOR<ingredientsUpdateManyMutationInput, ingredientsUncheckedUpdateManyInput>
    /**
     * Filter which ingredients to update
     */
    where?: ingredientsWhereInput
    /**
     * Limit how many ingredients to update.
     */
    limit?: number
  }

  /**
   * ingredients updateManyAndReturn
   */
  export type ingredientsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * The data used to update ingredients.
     */
    data: XOR<ingredientsUpdateManyMutationInput, ingredientsUncheckedUpdateManyInput>
    /**
     * Filter which ingredients to update
     */
    where?: ingredientsWhereInput
    /**
     * Limit how many ingredients to update.
     */
    limit?: number
  }

  /**
   * ingredients upsert
   */
  export type ingredientsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * The filter to search for the ingredients to update in case it exists.
     */
    where: ingredientsWhereUniqueInput
    /**
     * In case the ingredients found by the `where` argument doesn't exist, create a new ingredients with this data.
     */
    create: XOR<ingredientsCreateInput, ingredientsUncheckedCreateInput>
    /**
     * In case the ingredients was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ingredientsUpdateInput, ingredientsUncheckedUpdateInput>
  }

  /**
   * ingredients delete
   */
  export type ingredientsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
    /**
     * Filter which ingredients to delete.
     */
    where: ingredientsWhereUniqueInput
  }

  /**
   * ingredients deleteMany
   */
  export type ingredientsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ingredients to delete
     */
    where?: ingredientsWhereInput
    /**
     * Limit how many ingredients to delete.
     */
    limit?: number
  }

  /**
   * ingredients.recipe_ingredients
   */
  export type ingredients$recipe_ingredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    where?: recipe_ingredientsWhereInput
    orderBy?: recipe_ingredientsOrderByWithRelationInput | recipe_ingredientsOrderByWithRelationInput[]
    cursor?: recipe_ingredientsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }

  /**
   * ingredients without action
   */
  export type ingredientsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ingredients
     */
    select?: ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ingredients
     */
    omit?: ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ingredientsInclude<ExtArgs> | null
  }


  /**
   * Model meals
   */

  export type AggregateMeals = {
    _count: MealsCountAggregateOutputType | null
    _avg: MealsAvgAggregateOutputType | null
    _sum: MealsSumAggregateOutputType | null
    _min: MealsMinAggregateOutputType | null
    _max: MealsMaxAggregateOutputType | null
  }

  export type MealsAvgAggregateOutputType = {
    meal_id: number | null
  }

  export type MealsSumAggregateOutputType = {
    meal_id: number | null
  }

  export type MealsMinAggregateOutputType = {
    meal_id: number | null
    meal_name: string | null
    description: string | null
    is_balanced: boolean | null
    is_gourmet: boolean | null
    is_weight_loss: boolean | null
    package: string | null
    objective: string | null
    item_code: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MealsMaxAggregateOutputType = {
    meal_id: number | null
    meal_name: string | null
    description: string | null
    is_balanced: boolean | null
    is_gourmet: boolean | null
    is_weight_loss: boolean | null
    package: string | null
    objective: string | null
    item_code: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MealsCountAggregateOutputType = {
    meal_id: number
    meal_name: number
    description: number
    is_balanced: number
    is_gourmet: number
    is_weight_loss: number
    package: number
    objective: number
    item_code: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MealsAvgAggregateInputType = {
    meal_id?: true
  }

  export type MealsSumAggregateInputType = {
    meal_id?: true
  }

  export type MealsMinAggregateInputType = {
    meal_id?: true
    meal_name?: true
    description?: true
    is_balanced?: true
    is_gourmet?: true
    is_weight_loss?: true
    package?: true
    objective?: true
    item_code?: true
    created_at?: true
    updated_at?: true
  }

  export type MealsMaxAggregateInputType = {
    meal_id?: true
    meal_name?: true
    description?: true
    is_balanced?: true
    is_gourmet?: true
    is_weight_loss?: true
    package?: true
    objective?: true
    item_code?: true
    created_at?: true
    updated_at?: true
  }

  export type MealsCountAggregateInputType = {
    meal_id?: true
    meal_name?: true
    description?: true
    is_balanced?: true
    is_gourmet?: true
    is_weight_loss?: true
    package?: true
    objective?: true
    item_code?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MealsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which meals to aggregate.
     */
    where?: mealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meals to fetch.
     */
    orderBy?: mealsOrderByWithRelationInput | mealsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned meals
    **/
    _count?: true | MealsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealsMaxAggregateInputType
  }

  export type GetMealsAggregateType<T extends MealsAggregateArgs> = {
        [P in keyof T & keyof AggregateMeals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeals[P]>
      : GetScalarType<T[P], AggregateMeals[P]>
  }




  export type mealsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mealsWhereInput
    orderBy?: mealsOrderByWithAggregationInput | mealsOrderByWithAggregationInput[]
    by: MealsScalarFieldEnum[] | MealsScalarFieldEnum
    having?: mealsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealsCountAggregateInputType | true
    _avg?: MealsAvgAggregateInputType
    _sum?: MealsSumAggregateInputType
    _min?: MealsMinAggregateInputType
    _max?: MealsMaxAggregateInputType
  }

  export type MealsGroupByOutputType = {
    meal_id: number
    meal_name: string
    description: string | null
    is_balanced: boolean
    is_gourmet: boolean
    is_weight_loss: boolean
    package: string | null
    objective: string | null
    item_code: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: MealsCountAggregateOutputType | null
    _avg: MealsAvgAggregateOutputType | null
    _sum: MealsSumAggregateOutputType | null
    _min: MealsMinAggregateOutputType | null
    _max: MealsMaxAggregateOutputType | null
  }

  type GetMealsGroupByPayload<T extends mealsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealsGroupByOutputType[P]>
            : GetScalarType<T[P], MealsGroupByOutputType[P]>
        }
      >
    >


  export type mealsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    meal_id?: boolean
    meal_name?: boolean
    description?: boolean
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: boolean
    objective?: boolean
    item_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    components?: boolean | meals$componentsArgs<ExtArgs>
    portion_options?: boolean | meals$portion_optionsArgs<ExtArgs>
    _count?: boolean | MealsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meals"]>

  export type mealsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    meal_id?: boolean
    meal_name?: boolean
    description?: boolean
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: boolean
    objective?: boolean
    item_code?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["meals"]>

  export type mealsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    meal_id?: boolean
    meal_name?: boolean
    description?: boolean
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: boolean
    objective?: boolean
    item_code?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["meals"]>

  export type mealsSelectScalar = {
    meal_id?: boolean
    meal_name?: boolean
    description?: boolean
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: boolean
    objective?: boolean
    item_code?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type mealsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"meal_id" | "meal_name" | "description" | "is_balanced" | "is_gourmet" | "is_weight_loss" | "package" | "objective" | "item_code" | "created_at" | "updated_at", ExtArgs["result"]["meals"]>
  export type mealsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | meals$componentsArgs<ExtArgs>
    portion_options?: boolean | meals$portion_optionsArgs<ExtArgs>
    _count?: boolean | MealsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type mealsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type mealsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mealsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "meals"
    objects: {
      components: Prisma.$componentsPayload<ExtArgs>[]
      portion_options: Prisma.$portion_optionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      meal_id: number
      meal_name: string
      description: string | null
      is_balanced: boolean
      is_gourmet: boolean
      is_weight_loss: boolean
      package: string | null
      objective: string | null
      item_code: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["meals"]>
    composites: {}
  }

  type mealsGetPayload<S extends boolean | null | undefined | mealsDefaultArgs> = $Result.GetResult<Prisma.$mealsPayload, S>

  type mealsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mealsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealsCountAggregateInputType | true
    }

  export interface mealsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['meals'], meta: { name: 'meals' } }
    /**
     * Find zero or one Meals that matches the filter.
     * @param {mealsFindUniqueArgs} args - Arguments to find a Meals
     * @example
     * // Get one Meals
     * const meals = await prisma.meals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mealsFindUniqueArgs>(args: SelectSubset<T, mealsFindUniqueArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meals that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mealsFindUniqueOrThrowArgs} args - Arguments to find a Meals
     * @example
     * // Get one Meals
     * const meals = await prisma.meals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mealsFindUniqueOrThrowArgs>(args: SelectSubset<T, mealsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mealsFindFirstArgs} args - Arguments to find a Meals
     * @example
     * // Get one Meals
     * const meals = await prisma.meals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mealsFindFirstArgs>(args?: SelectSubset<T, mealsFindFirstArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meals that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mealsFindFirstOrThrowArgs} args - Arguments to find a Meals
     * @example
     * // Get one Meals
     * const meals = await prisma.meals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mealsFindFirstOrThrowArgs>(args?: SelectSubset<T, mealsFindFirstOrThrowArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mealsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meals
     * const meals = await prisma.meals.findMany()
     * 
     * // Get first 10 Meals
     * const meals = await prisma.meals.findMany({ take: 10 })
     * 
     * // Only select the `meal_id`
     * const mealsWithMeal_idOnly = await prisma.meals.findMany({ select: { meal_id: true } })
     * 
     */
    findMany<T extends mealsFindManyArgs>(args?: SelectSubset<T, mealsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meals.
     * @param {mealsCreateArgs} args - Arguments to create a Meals.
     * @example
     * // Create one Meals
     * const Meals = await prisma.meals.create({
     *   data: {
     *     // ... data to create a Meals
     *   }
     * })
     * 
     */
    create<T extends mealsCreateArgs>(args: SelectSubset<T, mealsCreateArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meals.
     * @param {mealsCreateManyArgs} args - Arguments to create many Meals.
     * @example
     * // Create many Meals
     * const meals = await prisma.meals.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mealsCreateManyArgs>(args?: SelectSubset<T, mealsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meals and returns the data saved in the database.
     * @param {mealsCreateManyAndReturnArgs} args - Arguments to create many Meals.
     * @example
     * // Create many Meals
     * const meals = await prisma.meals.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meals and only return the `meal_id`
     * const mealsWithMeal_idOnly = await prisma.meals.createManyAndReturn({
     *   select: { meal_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mealsCreateManyAndReturnArgs>(args?: SelectSubset<T, mealsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Meals.
     * @param {mealsDeleteArgs} args - Arguments to delete one Meals.
     * @example
     * // Delete one Meals
     * const Meals = await prisma.meals.delete({
     *   where: {
     *     // ... filter to delete one Meals
     *   }
     * })
     * 
     */
    delete<T extends mealsDeleteArgs>(args: SelectSubset<T, mealsDeleteArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meals.
     * @param {mealsUpdateArgs} args - Arguments to update one Meals.
     * @example
     * // Update one Meals
     * const meals = await prisma.meals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mealsUpdateArgs>(args: SelectSubset<T, mealsUpdateArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meals.
     * @param {mealsDeleteManyArgs} args - Arguments to filter Meals to delete.
     * @example
     * // Delete a few Meals
     * const { count } = await prisma.meals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mealsDeleteManyArgs>(args?: SelectSubset<T, mealsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mealsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meals
     * const meals = await prisma.meals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mealsUpdateManyArgs>(args: SelectSubset<T, mealsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meals and returns the data updated in the database.
     * @param {mealsUpdateManyAndReturnArgs} args - Arguments to update many Meals.
     * @example
     * // Update many Meals
     * const meals = await prisma.meals.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meals and only return the `meal_id`
     * const mealsWithMeal_idOnly = await prisma.meals.updateManyAndReturn({
     *   select: { meal_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends mealsUpdateManyAndReturnArgs>(args: SelectSubset<T, mealsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Meals.
     * @param {mealsUpsertArgs} args - Arguments to update or create a Meals.
     * @example
     * // Update or create a Meals
     * const meals = await prisma.meals.upsert({
     *   create: {
     *     // ... data to create a Meals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meals we want to update
     *   }
     * })
     */
    upsert<T extends mealsUpsertArgs>(args: SelectSubset<T, mealsUpsertArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mealsCountArgs} args - Arguments to filter Meals to count.
     * @example
     * // Count the number of Meals
     * const count = await prisma.meals.count({
     *   where: {
     *     // ... the filter for the Meals we want to count
     *   }
     * })
    **/
    count<T extends mealsCountArgs>(
      args?: Subset<T, mealsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MealsAggregateArgs>(args: Subset<T, MealsAggregateArgs>): Prisma.PrismaPromise<GetMealsAggregateType<T>>

    /**
     * Group by Meals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mealsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends mealsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mealsGroupByArgs['orderBy'] }
        : { orderBy?: mealsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, mealsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the meals model
   */
  readonly fields: mealsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for meals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mealsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    components<T extends meals$componentsArgs<ExtArgs> = {}>(args?: Subset<T, meals$componentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    portion_options<T extends meals$portion_optionsArgs<ExtArgs> = {}>(args?: Subset<T, meals$portion_optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the meals model
   */
  interface mealsFieldRefs {
    readonly meal_id: FieldRef<"meals", 'Int'>
    readonly meal_name: FieldRef<"meals", 'String'>
    readonly description: FieldRef<"meals", 'String'>
    readonly is_balanced: FieldRef<"meals", 'Boolean'>
    readonly is_gourmet: FieldRef<"meals", 'Boolean'>
    readonly is_weight_loss: FieldRef<"meals", 'Boolean'>
    readonly package: FieldRef<"meals", 'String'>
    readonly objective: FieldRef<"meals", 'String'>
    readonly item_code: FieldRef<"meals", 'String'>
    readonly created_at: FieldRef<"meals", 'DateTime'>
    readonly updated_at: FieldRef<"meals", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * meals findUnique
   */
  export type mealsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * Filter, which meals to fetch.
     */
    where: mealsWhereUniqueInput
  }

  /**
   * meals findUniqueOrThrow
   */
  export type mealsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * Filter, which meals to fetch.
     */
    where: mealsWhereUniqueInput
  }

  /**
   * meals findFirst
   */
  export type mealsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * Filter, which meals to fetch.
     */
    where?: mealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meals to fetch.
     */
    orderBy?: mealsOrderByWithRelationInput | mealsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for meals.
     */
    cursor?: mealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of meals.
     */
    distinct?: MealsScalarFieldEnum | MealsScalarFieldEnum[]
  }

  /**
   * meals findFirstOrThrow
   */
  export type mealsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * Filter, which meals to fetch.
     */
    where?: mealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meals to fetch.
     */
    orderBy?: mealsOrderByWithRelationInput | mealsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for meals.
     */
    cursor?: mealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of meals.
     */
    distinct?: MealsScalarFieldEnum | MealsScalarFieldEnum[]
  }

  /**
   * meals findMany
   */
  export type mealsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * Filter, which meals to fetch.
     */
    where?: mealsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meals to fetch.
     */
    orderBy?: mealsOrderByWithRelationInput | mealsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing meals.
     */
    cursor?: mealsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meals.
     */
    skip?: number
    distinct?: MealsScalarFieldEnum | MealsScalarFieldEnum[]
  }

  /**
   * meals create
   */
  export type mealsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * The data needed to create a meals.
     */
    data: XOR<mealsCreateInput, mealsUncheckedCreateInput>
  }

  /**
   * meals createMany
   */
  export type mealsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many meals.
     */
    data: mealsCreateManyInput | mealsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * meals createManyAndReturn
   */
  export type mealsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * The data used to create many meals.
     */
    data: mealsCreateManyInput | mealsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * meals update
   */
  export type mealsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * The data needed to update a meals.
     */
    data: XOR<mealsUpdateInput, mealsUncheckedUpdateInput>
    /**
     * Choose, which meals to update.
     */
    where: mealsWhereUniqueInput
  }

  /**
   * meals updateMany
   */
  export type mealsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update meals.
     */
    data: XOR<mealsUpdateManyMutationInput, mealsUncheckedUpdateManyInput>
    /**
     * Filter which meals to update
     */
    where?: mealsWhereInput
    /**
     * Limit how many meals to update.
     */
    limit?: number
  }

  /**
   * meals updateManyAndReturn
   */
  export type mealsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * The data used to update meals.
     */
    data: XOR<mealsUpdateManyMutationInput, mealsUncheckedUpdateManyInput>
    /**
     * Filter which meals to update
     */
    where?: mealsWhereInput
    /**
     * Limit how many meals to update.
     */
    limit?: number
  }

  /**
   * meals upsert
   */
  export type mealsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * The filter to search for the meals to update in case it exists.
     */
    where: mealsWhereUniqueInput
    /**
     * In case the meals found by the `where` argument doesn't exist, create a new meals with this data.
     */
    create: XOR<mealsCreateInput, mealsUncheckedCreateInput>
    /**
     * In case the meals was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mealsUpdateInput, mealsUncheckedUpdateInput>
  }

  /**
   * meals delete
   */
  export type mealsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    /**
     * Filter which meals to delete.
     */
    where: mealsWhereUniqueInput
  }

  /**
   * meals deleteMany
   */
  export type mealsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which meals to delete
     */
    where?: mealsWhereInput
    /**
     * Limit how many meals to delete.
     */
    limit?: number
  }

  /**
   * meals.components
   */
  export type meals$componentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    where?: componentsWhereInput
    orderBy?: componentsOrderByWithRelationInput | componentsOrderByWithRelationInput[]
    cursor?: componentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComponentsScalarFieldEnum | ComponentsScalarFieldEnum[]
  }

  /**
   * meals.portion_options
   */
  export type meals$portion_optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    where?: portion_optionsWhereInput
    orderBy?: portion_optionsOrderByWithRelationInput | portion_optionsOrderByWithRelationInput[]
    cursor?: portion_optionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Portion_optionsScalarFieldEnum | Portion_optionsScalarFieldEnum[]
  }

  /**
   * meals without action
   */
  export type mealsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
  }


  /**
   * Model portion_options
   */

  export type AggregatePortion_options = {
    _count: Portion_optionsCountAggregateOutputType | null
    _avg: Portion_optionsAvgAggregateOutputType | null
    _sum: Portion_optionsSumAggregateOutputType | null
    _min: Portion_optionsMinAggregateOutputType | null
    _max: Portion_optionsMaxAggregateOutputType | null
  }

  export type Portion_optionsAvgAggregateOutputType = {
    portion_id: number | null
    meal_id: number | null
    multiplier: Decimal | null
  }

  export type Portion_optionsSumAggregateOutputType = {
    portion_id: number | null
    meal_id: number | null
    multiplier: Decimal | null
  }

  export type Portion_optionsMinAggregateOutputType = {
    portion_id: number | null
    meal_id: number | null
    size_name: string | null
    multiplier: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Portion_optionsMaxAggregateOutputType = {
    portion_id: number | null
    meal_id: number | null
    size_name: string | null
    multiplier: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Portion_optionsCountAggregateOutputType = {
    portion_id: number
    meal_id: number
    size_name: number
    multiplier: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Portion_optionsAvgAggregateInputType = {
    portion_id?: true
    meal_id?: true
    multiplier?: true
  }

  export type Portion_optionsSumAggregateInputType = {
    portion_id?: true
    meal_id?: true
    multiplier?: true
  }

  export type Portion_optionsMinAggregateInputType = {
    portion_id?: true
    meal_id?: true
    size_name?: true
    multiplier?: true
    created_at?: true
    updated_at?: true
  }

  export type Portion_optionsMaxAggregateInputType = {
    portion_id?: true
    meal_id?: true
    size_name?: true
    multiplier?: true
    created_at?: true
    updated_at?: true
  }

  export type Portion_optionsCountAggregateInputType = {
    portion_id?: true
    meal_id?: true
    size_name?: true
    multiplier?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Portion_optionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which portion_options to aggregate.
     */
    where?: portion_optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of portion_options to fetch.
     */
    orderBy?: portion_optionsOrderByWithRelationInput | portion_optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: portion_optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` portion_options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` portion_options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned portion_options
    **/
    _count?: true | Portion_optionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Portion_optionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Portion_optionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Portion_optionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Portion_optionsMaxAggregateInputType
  }

  export type GetPortion_optionsAggregateType<T extends Portion_optionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePortion_options]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortion_options[P]>
      : GetScalarType<T[P], AggregatePortion_options[P]>
  }




  export type portion_optionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: portion_optionsWhereInput
    orderBy?: portion_optionsOrderByWithAggregationInput | portion_optionsOrderByWithAggregationInput[]
    by: Portion_optionsScalarFieldEnum[] | Portion_optionsScalarFieldEnum
    having?: portion_optionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Portion_optionsCountAggregateInputType | true
    _avg?: Portion_optionsAvgAggregateInputType
    _sum?: Portion_optionsSumAggregateInputType
    _min?: Portion_optionsMinAggregateInputType
    _max?: Portion_optionsMaxAggregateInputType
  }

  export type Portion_optionsGroupByOutputType = {
    portion_id: number
    meal_id: number | null
    size_name: string
    multiplier: Decimal
    created_at: Date | null
    updated_at: Date | null
    _count: Portion_optionsCountAggregateOutputType | null
    _avg: Portion_optionsAvgAggregateOutputType | null
    _sum: Portion_optionsSumAggregateOutputType | null
    _min: Portion_optionsMinAggregateOutputType | null
    _max: Portion_optionsMaxAggregateOutputType | null
  }

  type GetPortion_optionsGroupByPayload<T extends portion_optionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Portion_optionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Portion_optionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Portion_optionsGroupByOutputType[P]>
            : GetScalarType<T[P], Portion_optionsGroupByOutputType[P]>
        }
      >
    >


  export type portion_optionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    portion_id?: boolean
    meal_id?: boolean
    size_name?: boolean
    multiplier?: boolean
    created_at?: boolean
    updated_at?: boolean
    meals?: boolean | portion_options$mealsArgs<ExtArgs>
  }, ExtArgs["result"]["portion_options"]>

  export type portion_optionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    portion_id?: boolean
    meal_id?: boolean
    size_name?: boolean
    multiplier?: boolean
    created_at?: boolean
    updated_at?: boolean
    meals?: boolean | portion_options$mealsArgs<ExtArgs>
  }, ExtArgs["result"]["portion_options"]>

  export type portion_optionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    portion_id?: boolean
    meal_id?: boolean
    size_name?: boolean
    multiplier?: boolean
    created_at?: boolean
    updated_at?: boolean
    meals?: boolean | portion_options$mealsArgs<ExtArgs>
  }, ExtArgs["result"]["portion_options"]>

  export type portion_optionsSelectScalar = {
    portion_id?: boolean
    meal_id?: boolean
    size_name?: boolean
    multiplier?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type portion_optionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"portion_id" | "meal_id" | "size_name" | "multiplier" | "created_at" | "updated_at", ExtArgs["result"]["portion_options"]>
  export type portion_optionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meals?: boolean | portion_options$mealsArgs<ExtArgs>
  }
  export type portion_optionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meals?: boolean | portion_options$mealsArgs<ExtArgs>
  }
  export type portion_optionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meals?: boolean | portion_options$mealsArgs<ExtArgs>
  }

  export type $portion_optionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "portion_options"
    objects: {
      meals: Prisma.$mealsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      portion_id: number
      meal_id: number | null
      size_name: string
      multiplier: Prisma.Decimal
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["portion_options"]>
    composites: {}
  }

  type portion_optionsGetPayload<S extends boolean | null | undefined | portion_optionsDefaultArgs> = $Result.GetResult<Prisma.$portion_optionsPayload, S>

  type portion_optionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<portion_optionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Portion_optionsCountAggregateInputType | true
    }

  export interface portion_optionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['portion_options'], meta: { name: 'portion_options' } }
    /**
     * Find zero or one Portion_options that matches the filter.
     * @param {portion_optionsFindUniqueArgs} args - Arguments to find a Portion_options
     * @example
     * // Get one Portion_options
     * const portion_options = await prisma.portion_options.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends portion_optionsFindUniqueArgs>(args: SelectSubset<T, portion_optionsFindUniqueArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Portion_options that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {portion_optionsFindUniqueOrThrowArgs} args - Arguments to find a Portion_options
     * @example
     * // Get one Portion_options
     * const portion_options = await prisma.portion_options.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends portion_optionsFindUniqueOrThrowArgs>(args: SelectSubset<T, portion_optionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portion_options that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {portion_optionsFindFirstArgs} args - Arguments to find a Portion_options
     * @example
     * // Get one Portion_options
     * const portion_options = await prisma.portion_options.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends portion_optionsFindFirstArgs>(args?: SelectSubset<T, portion_optionsFindFirstArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portion_options that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {portion_optionsFindFirstOrThrowArgs} args - Arguments to find a Portion_options
     * @example
     * // Get one Portion_options
     * const portion_options = await prisma.portion_options.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends portion_optionsFindFirstOrThrowArgs>(args?: SelectSubset<T, portion_optionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portion_options that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {portion_optionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portion_options
     * const portion_options = await prisma.portion_options.findMany()
     * 
     * // Get first 10 Portion_options
     * const portion_options = await prisma.portion_options.findMany({ take: 10 })
     * 
     * // Only select the `portion_id`
     * const portion_optionsWithPortion_idOnly = await prisma.portion_options.findMany({ select: { portion_id: true } })
     * 
     */
    findMany<T extends portion_optionsFindManyArgs>(args?: SelectSubset<T, portion_optionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Portion_options.
     * @param {portion_optionsCreateArgs} args - Arguments to create a Portion_options.
     * @example
     * // Create one Portion_options
     * const Portion_options = await prisma.portion_options.create({
     *   data: {
     *     // ... data to create a Portion_options
     *   }
     * })
     * 
     */
    create<T extends portion_optionsCreateArgs>(args: SelectSubset<T, portion_optionsCreateArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Portion_options.
     * @param {portion_optionsCreateManyArgs} args - Arguments to create many Portion_options.
     * @example
     * // Create many Portion_options
     * const portion_options = await prisma.portion_options.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends portion_optionsCreateManyArgs>(args?: SelectSubset<T, portion_optionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portion_options and returns the data saved in the database.
     * @param {portion_optionsCreateManyAndReturnArgs} args - Arguments to create many Portion_options.
     * @example
     * // Create many Portion_options
     * const portion_options = await prisma.portion_options.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portion_options and only return the `portion_id`
     * const portion_optionsWithPortion_idOnly = await prisma.portion_options.createManyAndReturn({
     *   select: { portion_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends portion_optionsCreateManyAndReturnArgs>(args?: SelectSubset<T, portion_optionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Portion_options.
     * @param {portion_optionsDeleteArgs} args - Arguments to delete one Portion_options.
     * @example
     * // Delete one Portion_options
     * const Portion_options = await prisma.portion_options.delete({
     *   where: {
     *     // ... filter to delete one Portion_options
     *   }
     * })
     * 
     */
    delete<T extends portion_optionsDeleteArgs>(args: SelectSubset<T, portion_optionsDeleteArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Portion_options.
     * @param {portion_optionsUpdateArgs} args - Arguments to update one Portion_options.
     * @example
     * // Update one Portion_options
     * const portion_options = await prisma.portion_options.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends portion_optionsUpdateArgs>(args: SelectSubset<T, portion_optionsUpdateArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Portion_options.
     * @param {portion_optionsDeleteManyArgs} args - Arguments to filter Portion_options to delete.
     * @example
     * // Delete a few Portion_options
     * const { count } = await prisma.portion_options.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends portion_optionsDeleteManyArgs>(args?: SelectSubset<T, portion_optionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portion_options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {portion_optionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portion_options
     * const portion_options = await prisma.portion_options.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends portion_optionsUpdateManyArgs>(args: SelectSubset<T, portion_optionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portion_options and returns the data updated in the database.
     * @param {portion_optionsUpdateManyAndReturnArgs} args - Arguments to update many Portion_options.
     * @example
     * // Update many Portion_options
     * const portion_options = await prisma.portion_options.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Portion_options and only return the `portion_id`
     * const portion_optionsWithPortion_idOnly = await prisma.portion_options.updateManyAndReturn({
     *   select: { portion_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends portion_optionsUpdateManyAndReturnArgs>(args: SelectSubset<T, portion_optionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Portion_options.
     * @param {portion_optionsUpsertArgs} args - Arguments to update or create a Portion_options.
     * @example
     * // Update or create a Portion_options
     * const portion_options = await prisma.portion_options.upsert({
     *   create: {
     *     // ... data to create a Portion_options
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portion_options we want to update
     *   }
     * })
     */
    upsert<T extends portion_optionsUpsertArgs>(args: SelectSubset<T, portion_optionsUpsertArgs<ExtArgs>>): Prisma__portion_optionsClient<$Result.GetResult<Prisma.$portion_optionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Portion_options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {portion_optionsCountArgs} args - Arguments to filter Portion_options to count.
     * @example
     * // Count the number of Portion_options
     * const count = await prisma.portion_options.count({
     *   where: {
     *     // ... the filter for the Portion_options we want to count
     *   }
     * })
    **/
    count<T extends portion_optionsCountArgs>(
      args?: Subset<T, portion_optionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Portion_optionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portion_options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Portion_optionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Portion_optionsAggregateArgs>(args: Subset<T, Portion_optionsAggregateArgs>): Prisma.PrismaPromise<GetPortion_optionsAggregateType<T>>

    /**
     * Group by Portion_options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {portion_optionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends portion_optionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: portion_optionsGroupByArgs['orderBy'] }
        : { orderBy?: portion_optionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, portion_optionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortion_optionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the portion_options model
   */
  readonly fields: portion_optionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for portion_options.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__portion_optionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meals<T extends portion_options$mealsArgs<ExtArgs> = {}>(args?: Subset<T, portion_options$mealsArgs<ExtArgs>>): Prisma__mealsClient<$Result.GetResult<Prisma.$mealsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the portion_options model
   */
  interface portion_optionsFieldRefs {
    readonly portion_id: FieldRef<"portion_options", 'Int'>
    readonly meal_id: FieldRef<"portion_options", 'Int'>
    readonly size_name: FieldRef<"portion_options", 'String'>
    readonly multiplier: FieldRef<"portion_options", 'Decimal'>
    readonly created_at: FieldRef<"portion_options", 'DateTime'>
    readonly updated_at: FieldRef<"portion_options", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * portion_options findUnique
   */
  export type portion_optionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * Filter, which portion_options to fetch.
     */
    where: portion_optionsWhereUniqueInput
  }

  /**
   * portion_options findUniqueOrThrow
   */
  export type portion_optionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * Filter, which portion_options to fetch.
     */
    where: portion_optionsWhereUniqueInput
  }

  /**
   * portion_options findFirst
   */
  export type portion_optionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * Filter, which portion_options to fetch.
     */
    where?: portion_optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of portion_options to fetch.
     */
    orderBy?: portion_optionsOrderByWithRelationInput | portion_optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for portion_options.
     */
    cursor?: portion_optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` portion_options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` portion_options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of portion_options.
     */
    distinct?: Portion_optionsScalarFieldEnum | Portion_optionsScalarFieldEnum[]
  }

  /**
   * portion_options findFirstOrThrow
   */
  export type portion_optionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * Filter, which portion_options to fetch.
     */
    where?: portion_optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of portion_options to fetch.
     */
    orderBy?: portion_optionsOrderByWithRelationInput | portion_optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for portion_options.
     */
    cursor?: portion_optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` portion_options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` portion_options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of portion_options.
     */
    distinct?: Portion_optionsScalarFieldEnum | Portion_optionsScalarFieldEnum[]
  }

  /**
   * portion_options findMany
   */
  export type portion_optionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * Filter, which portion_options to fetch.
     */
    where?: portion_optionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of portion_options to fetch.
     */
    orderBy?: portion_optionsOrderByWithRelationInput | portion_optionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing portion_options.
     */
    cursor?: portion_optionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` portion_options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` portion_options.
     */
    skip?: number
    distinct?: Portion_optionsScalarFieldEnum | Portion_optionsScalarFieldEnum[]
  }

  /**
   * portion_options create
   */
  export type portion_optionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * The data needed to create a portion_options.
     */
    data: XOR<portion_optionsCreateInput, portion_optionsUncheckedCreateInput>
  }

  /**
   * portion_options createMany
   */
  export type portion_optionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many portion_options.
     */
    data: portion_optionsCreateManyInput | portion_optionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * portion_options createManyAndReturn
   */
  export type portion_optionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * The data used to create many portion_options.
     */
    data: portion_optionsCreateManyInput | portion_optionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * portion_options update
   */
  export type portion_optionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * The data needed to update a portion_options.
     */
    data: XOR<portion_optionsUpdateInput, portion_optionsUncheckedUpdateInput>
    /**
     * Choose, which portion_options to update.
     */
    where: portion_optionsWhereUniqueInput
  }

  /**
   * portion_options updateMany
   */
  export type portion_optionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update portion_options.
     */
    data: XOR<portion_optionsUpdateManyMutationInput, portion_optionsUncheckedUpdateManyInput>
    /**
     * Filter which portion_options to update
     */
    where?: portion_optionsWhereInput
    /**
     * Limit how many portion_options to update.
     */
    limit?: number
  }

  /**
   * portion_options updateManyAndReturn
   */
  export type portion_optionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * The data used to update portion_options.
     */
    data: XOR<portion_optionsUpdateManyMutationInput, portion_optionsUncheckedUpdateManyInput>
    /**
     * Filter which portion_options to update
     */
    where?: portion_optionsWhereInput
    /**
     * Limit how many portion_options to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * portion_options upsert
   */
  export type portion_optionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * The filter to search for the portion_options to update in case it exists.
     */
    where: portion_optionsWhereUniqueInput
    /**
     * In case the portion_options found by the `where` argument doesn't exist, create a new portion_options with this data.
     */
    create: XOR<portion_optionsCreateInput, portion_optionsUncheckedCreateInput>
    /**
     * In case the portion_options was found with the provided `where` argument, update it with this data.
     */
    update: XOR<portion_optionsUpdateInput, portion_optionsUncheckedUpdateInput>
  }

  /**
   * portion_options delete
   */
  export type portion_optionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
    /**
     * Filter which portion_options to delete.
     */
    where: portion_optionsWhereUniqueInput
  }

  /**
   * portion_options deleteMany
   */
  export type portion_optionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which portion_options to delete
     */
    where?: portion_optionsWhereInput
    /**
     * Limit how many portion_options to delete.
     */
    limit?: number
  }

  /**
   * portion_options.meals
   */
  export type portion_options$mealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meals
     */
    select?: mealsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meals
     */
    omit?: mealsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mealsInclude<ExtArgs> | null
    where?: mealsWhereInput
  }

  /**
   * portion_options without action
   */
  export type portion_optionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the portion_options
     */
    select?: portion_optionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the portion_options
     */
    omit?: portion_optionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: portion_optionsInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model recipe_ingredients
   */

  export type AggregateRecipe_ingredients = {
    _count: Recipe_ingredientsCountAggregateOutputType | null
    _avg: Recipe_ingredientsAvgAggregateOutputType | null
    _sum: Recipe_ingredientsSumAggregateOutputType | null
    _min: Recipe_ingredientsMinAggregateOutputType | null
    _max: Recipe_ingredientsMaxAggregateOutputType | null
  }

  export type Recipe_ingredientsAvgAggregateOutputType = {
    component_id: number | null
    ingredient_id: number | null
    raw_quantity_g: Decimal | null
    cooked_quantity_g: Decimal | null
  }

  export type Recipe_ingredientsSumAggregateOutputType = {
    component_id: number | null
    ingredient_id: number | null
    raw_quantity_g: Decimal | null
    cooked_quantity_g: Decimal | null
  }

  export type Recipe_ingredientsMinAggregateOutputType = {
    component_id: number | null
    ingredient_id: number | null
    raw_quantity_g: Decimal | null
    cooked_quantity_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Recipe_ingredientsMaxAggregateOutputType = {
    component_id: number | null
    ingredient_id: number | null
    raw_quantity_g: Decimal | null
    cooked_quantity_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Recipe_ingredientsCountAggregateOutputType = {
    component_id: number
    ingredient_id: number
    raw_quantity_g: number
    cooked_quantity_g: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Recipe_ingredientsAvgAggregateInputType = {
    component_id?: true
    ingredient_id?: true
    raw_quantity_g?: true
    cooked_quantity_g?: true
  }

  export type Recipe_ingredientsSumAggregateInputType = {
    component_id?: true
    ingredient_id?: true
    raw_quantity_g?: true
    cooked_quantity_g?: true
  }

  export type Recipe_ingredientsMinAggregateInputType = {
    component_id?: true
    ingredient_id?: true
    raw_quantity_g?: true
    cooked_quantity_g?: true
    created_at?: true
    updated_at?: true
  }

  export type Recipe_ingredientsMaxAggregateInputType = {
    component_id?: true
    ingredient_id?: true
    raw_quantity_g?: true
    cooked_quantity_g?: true
    created_at?: true
    updated_at?: true
  }

  export type Recipe_ingredientsCountAggregateInputType = {
    component_id?: true
    ingredient_id?: true
    raw_quantity_g?: true
    cooked_quantity_g?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Recipe_ingredientsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which recipe_ingredients to aggregate.
     */
    where?: recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipe_ingredients to fetch.
     */
    orderBy?: recipe_ingredientsOrderByWithRelationInput | recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipe_ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned recipe_ingredients
    **/
    _count?: true | Recipe_ingredientsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Recipe_ingredientsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Recipe_ingredientsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Recipe_ingredientsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Recipe_ingredientsMaxAggregateInputType
  }

  export type GetRecipe_ingredientsAggregateType<T extends Recipe_ingredientsAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe_ingredients]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe_ingredients[P]>
      : GetScalarType<T[P], AggregateRecipe_ingredients[P]>
  }




  export type recipe_ingredientsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: recipe_ingredientsWhereInput
    orderBy?: recipe_ingredientsOrderByWithAggregationInput | recipe_ingredientsOrderByWithAggregationInput[]
    by: Recipe_ingredientsScalarFieldEnum[] | Recipe_ingredientsScalarFieldEnum
    having?: recipe_ingredientsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Recipe_ingredientsCountAggregateInputType | true
    _avg?: Recipe_ingredientsAvgAggregateInputType
    _sum?: Recipe_ingredientsSumAggregateInputType
    _min?: Recipe_ingredientsMinAggregateInputType
    _max?: Recipe_ingredientsMaxAggregateInputType
  }

  export type Recipe_ingredientsGroupByOutputType = {
    component_id: number
    ingredient_id: number
    raw_quantity_g: Decimal
    cooked_quantity_g: Decimal | null
    created_at: Date | null
    updated_at: Date | null
    _count: Recipe_ingredientsCountAggregateOutputType | null
    _avg: Recipe_ingredientsAvgAggregateOutputType | null
    _sum: Recipe_ingredientsSumAggregateOutputType | null
    _min: Recipe_ingredientsMinAggregateOutputType | null
    _max: Recipe_ingredientsMaxAggregateOutputType | null
  }

  type GetRecipe_ingredientsGroupByPayload<T extends recipe_ingredientsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Recipe_ingredientsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Recipe_ingredientsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Recipe_ingredientsGroupByOutputType[P]>
            : GetScalarType<T[P], Recipe_ingredientsGroupByOutputType[P]>
        }
      >
    >


  export type recipe_ingredientsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    component_id?: boolean
    ingredient_id?: boolean
    raw_quantity_g?: boolean
    cooked_quantity_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    components?: boolean | componentsDefaultArgs<ExtArgs>
    ingredients?: boolean | ingredientsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe_ingredients"]>

  export type recipe_ingredientsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    component_id?: boolean
    ingredient_id?: boolean
    raw_quantity_g?: boolean
    cooked_quantity_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    components?: boolean | componentsDefaultArgs<ExtArgs>
    ingredients?: boolean | ingredientsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe_ingredients"]>

  export type recipe_ingredientsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    component_id?: boolean
    ingredient_id?: boolean
    raw_quantity_g?: boolean
    cooked_quantity_g?: boolean
    created_at?: boolean
    updated_at?: boolean
    components?: boolean | componentsDefaultArgs<ExtArgs>
    ingredients?: boolean | ingredientsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe_ingredients"]>

  export type recipe_ingredientsSelectScalar = {
    component_id?: boolean
    ingredient_id?: boolean
    raw_quantity_g?: boolean
    cooked_quantity_g?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type recipe_ingredientsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"component_id" | "ingredient_id" | "raw_quantity_g" | "cooked_quantity_g" | "created_at" | "updated_at", ExtArgs["result"]["recipe_ingredients"]>
  export type recipe_ingredientsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | componentsDefaultArgs<ExtArgs>
    ingredients?: boolean | ingredientsDefaultArgs<ExtArgs>
  }
  export type recipe_ingredientsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | componentsDefaultArgs<ExtArgs>
    ingredients?: boolean | ingredientsDefaultArgs<ExtArgs>
  }
  export type recipe_ingredientsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | componentsDefaultArgs<ExtArgs>
    ingredients?: boolean | ingredientsDefaultArgs<ExtArgs>
  }

  export type $recipe_ingredientsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "recipe_ingredients"
    objects: {
      components: Prisma.$componentsPayload<ExtArgs>
      ingredients: Prisma.$ingredientsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      component_id: number
      ingredient_id: number
      raw_quantity_g: Prisma.Decimal
      cooked_quantity_g: Prisma.Decimal | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["recipe_ingredients"]>
    composites: {}
  }

  type recipe_ingredientsGetPayload<S extends boolean | null | undefined | recipe_ingredientsDefaultArgs> = $Result.GetResult<Prisma.$recipe_ingredientsPayload, S>

  type recipe_ingredientsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<recipe_ingredientsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Recipe_ingredientsCountAggregateInputType | true
    }

  export interface recipe_ingredientsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['recipe_ingredients'], meta: { name: 'recipe_ingredients' } }
    /**
     * Find zero or one Recipe_ingredients that matches the filter.
     * @param {recipe_ingredientsFindUniqueArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends recipe_ingredientsFindUniqueArgs>(args: SelectSubset<T, recipe_ingredientsFindUniqueArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recipe_ingredients that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {recipe_ingredientsFindUniqueOrThrowArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends recipe_ingredientsFindUniqueOrThrowArgs>(args: SelectSubset<T, recipe_ingredientsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe_ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipe_ingredientsFindFirstArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends recipe_ingredientsFindFirstArgs>(args?: SelectSubset<T, recipe_ingredientsFindFirstArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe_ingredients that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipe_ingredientsFindFirstOrThrowArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends recipe_ingredientsFindFirstOrThrowArgs>(args?: SelectSubset<T, recipe_ingredientsFindFirstOrThrowArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recipe_ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipe_ingredientsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findMany()
     * 
     * // Get first 10 Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findMany({ take: 10 })
     * 
     * // Only select the `component_id`
     * const recipe_ingredientsWithComponent_idOnly = await prisma.recipe_ingredients.findMany({ select: { component_id: true } })
     * 
     */
    findMany<T extends recipe_ingredientsFindManyArgs>(args?: SelectSubset<T, recipe_ingredientsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recipe_ingredients.
     * @param {recipe_ingredientsCreateArgs} args - Arguments to create a Recipe_ingredients.
     * @example
     * // Create one Recipe_ingredients
     * const Recipe_ingredients = await prisma.recipe_ingredients.create({
     *   data: {
     *     // ... data to create a Recipe_ingredients
     *   }
     * })
     * 
     */
    create<T extends recipe_ingredientsCreateArgs>(args: SelectSubset<T, recipe_ingredientsCreateArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recipe_ingredients.
     * @param {recipe_ingredientsCreateManyArgs} args - Arguments to create many Recipe_ingredients.
     * @example
     * // Create many Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends recipe_ingredientsCreateManyArgs>(args?: SelectSubset<T, recipe_ingredientsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recipe_ingredients and returns the data saved in the database.
     * @param {recipe_ingredientsCreateManyAndReturnArgs} args - Arguments to create many Recipe_ingredients.
     * @example
     * // Create many Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recipe_ingredients and only return the `component_id`
     * const recipe_ingredientsWithComponent_idOnly = await prisma.recipe_ingredients.createManyAndReturn({
     *   select: { component_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends recipe_ingredientsCreateManyAndReturnArgs>(args?: SelectSubset<T, recipe_ingredientsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recipe_ingredients.
     * @param {recipe_ingredientsDeleteArgs} args - Arguments to delete one Recipe_ingredients.
     * @example
     * // Delete one Recipe_ingredients
     * const Recipe_ingredients = await prisma.recipe_ingredients.delete({
     *   where: {
     *     // ... filter to delete one Recipe_ingredients
     *   }
     * })
     * 
     */
    delete<T extends recipe_ingredientsDeleteArgs>(args: SelectSubset<T, recipe_ingredientsDeleteArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recipe_ingredients.
     * @param {recipe_ingredientsUpdateArgs} args - Arguments to update one Recipe_ingredients.
     * @example
     * // Update one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends recipe_ingredientsUpdateArgs>(args: SelectSubset<T, recipe_ingredientsUpdateArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recipe_ingredients.
     * @param {recipe_ingredientsDeleteManyArgs} args - Arguments to filter Recipe_ingredients to delete.
     * @example
     * // Delete a few Recipe_ingredients
     * const { count } = await prisma.recipe_ingredients.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends recipe_ingredientsDeleteManyArgs>(args?: SelectSubset<T, recipe_ingredientsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipe_ingredientsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends recipe_ingredientsUpdateManyArgs>(args: SelectSubset<T, recipe_ingredientsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipe_ingredients and returns the data updated in the database.
     * @param {recipe_ingredientsUpdateManyAndReturnArgs} args - Arguments to update many Recipe_ingredients.
     * @example
     * // Update many Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recipe_ingredients and only return the `component_id`
     * const recipe_ingredientsWithComponent_idOnly = await prisma.recipe_ingredients.updateManyAndReturn({
     *   select: { component_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends recipe_ingredientsUpdateManyAndReturnArgs>(args: SelectSubset<T, recipe_ingredientsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recipe_ingredients.
     * @param {recipe_ingredientsUpsertArgs} args - Arguments to update or create a Recipe_ingredients.
     * @example
     * // Update or create a Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.upsert({
     *   create: {
     *     // ... data to create a Recipe_ingredients
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe_ingredients we want to update
     *   }
     * })
     */
    upsert<T extends recipe_ingredientsUpsertArgs>(args: SelectSubset<T, recipe_ingredientsUpsertArgs<ExtArgs>>): Prisma__recipe_ingredientsClient<$Result.GetResult<Prisma.$recipe_ingredientsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipe_ingredientsCountArgs} args - Arguments to filter Recipe_ingredients to count.
     * @example
     * // Count the number of Recipe_ingredients
     * const count = await prisma.recipe_ingredients.count({
     *   where: {
     *     // ... the filter for the Recipe_ingredients we want to count
     *   }
     * })
    **/
    count<T extends recipe_ingredientsCountArgs>(
      args?: Subset<T, recipe_ingredientsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Recipe_ingredientsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Recipe_ingredientsAggregateArgs>(args: Subset<T, Recipe_ingredientsAggregateArgs>): Prisma.PrismaPromise<GetRecipe_ingredientsAggregateType<T>>

    /**
     * Group by Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipe_ingredientsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends recipe_ingredientsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: recipe_ingredientsGroupByArgs['orderBy'] }
        : { orderBy?: recipe_ingredientsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, recipe_ingredientsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipe_ingredientsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the recipe_ingredients model
   */
  readonly fields: recipe_ingredientsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for recipe_ingredients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__recipe_ingredientsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    components<T extends componentsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, componentsDefaultArgs<ExtArgs>>): Prisma__componentsClient<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ingredients<T extends ingredientsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ingredientsDefaultArgs<ExtArgs>>): Prisma__ingredientsClient<$Result.GetResult<Prisma.$ingredientsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the recipe_ingredients model
   */
  interface recipe_ingredientsFieldRefs {
    readonly component_id: FieldRef<"recipe_ingredients", 'Int'>
    readonly ingredient_id: FieldRef<"recipe_ingredients", 'Int'>
    readonly raw_quantity_g: FieldRef<"recipe_ingredients", 'Decimal'>
    readonly cooked_quantity_g: FieldRef<"recipe_ingredients", 'Decimal'>
    readonly created_at: FieldRef<"recipe_ingredients", 'DateTime'>
    readonly updated_at: FieldRef<"recipe_ingredients", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * recipe_ingredients findUnique
   */
  export type recipe_ingredientsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which recipe_ingredients to fetch.
     */
    where: recipe_ingredientsWhereUniqueInput
  }

  /**
   * recipe_ingredients findUniqueOrThrow
   */
  export type recipe_ingredientsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which recipe_ingredients to fetch.
     */
    where: recipe_ingredientsWhereUniqueInput
  }

  /**
   * recipe_ingredients findFirst
   */
  export type recipe_ingredientsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which recipe_ingredients to fetch.
     */
    where?: recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipe_ingredients to fetch.
     */
    orderBy?: recipe_ingredientsOrderByWithRelationInput | recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for recipe_ingredients.
     */
    cursor?: recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipe_ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of recipe_ingredients.
     */
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }

  /**
   * recipe_ingredients findFirstOrThrow
   */
  export type recipe_ingredientsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which recipe_ingredients to fetch.
     */
    where?: recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipe_ingredients to fetch.
     */
    orderBy?: recipe_ingredientsOrderByWithRelationInput | recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for recipe_ingredients.
     */
    cursor?: recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipe_ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of recipe_ingredients.
     */
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }

  /**
   * recipe_ingredients findMany
   */
  export type recipe_ingredientsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which recipe_ingredients to fetch.
     */
    where?: recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipe_ingredients to fetch.
     */
    orderBy?: recipe_ingredientsOrderByWithRelationInput | recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing recipe_ingredients.
     */
    cursor?: recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipe_ingredients.
     */
    skip?: number
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }

  /**
   * recipe_ingredients create
   */
  export type recipe_ingredientsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * The data needed to create a recipe_ingredients.
     */
    data: XOR<recipe_ingredientsCreateInput, recipe_ingredientsUncheckedCreateInput>
  }

  /**
   * recipe_ingredients createMany
   */
  export type recipe_ingredientsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many recipe_ingredients.
     */
    data: recipe_ingredientsCreateManyInput | recipe_ingredientsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * recipe_ingredients createManyAndReturn
   */
  export type recipe_ingredientsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * The data used to create many recipe_ingredients.
     */
    data: recipe_ingredientsCreateManyInput | recipe_ingredientsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * recipe_ingredients update
   */
  export type recipe_ingredientsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * The data needed to update a recipe_ingredients.
     */
    data: XOR<recipe_ingredientsUpdateInput, recipe_ingredientsUncheckedUpdateInput>
    /**
     * Choose, which recipe_ingredients to update.
     */
    where: recipe_ingredientsWhereUniqueInput
  }

  /**
   * recipe_ingredients updateMany
   */
  export type recipe_ingredientsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update recipe_ingredients.
     */
    data: XOR<recipe_ingredientsUpdateManyMutationInput, recipe_ingredientsUncheckedUpdateManyInput>
    /**
     * Filter which recipe_ingredients to update
     */
    where?: recipe_ingredientsWhereInput
    /**
     * Limit how many recipe_ingredients to update.
     */
    limit?: number
  }

  /**
   * recipe_ingredients updateManyAndReturn
   */
  export type recipe_ingredientsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * The data used to update recipe_ingredients.
     */
    data: XOR<recipe_ingredientsUpdateManyMutationInput, recipe_ingredientsUncheckedUpdateManyInput>
    /**
     * Filter which recipe_ingredients to update
     */
    where?: recipe_ingredientsWhereInput
    /**
     * Limit how many recipe_ingredients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * recipe_ingredients upsert
   */
  export type recipe_ingredientsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * The filter to search for the recipe_ingredients to update in case it exists.
     */
    where: recipe_ingredientsWhereUniqueInput
    /**
     * In case the recipe_ingredients found by the `where` argument doesn't exist, create a new recipe_ingredients with this data.
     */
    create: XOR<recipe_ingredientsCreateInput, recipe_ingredientsUncheckedCreateInput>
    /**
     * In case the recipe_ingredients was found with the provided `where` argument, update it with this data.
     */
    update: XOR<recipe_ingredientsUpdateInput, recipe_ingredientsUncheckedUpdateInput>
  }

  /**
   * recipe_ingredients delete
   */
  export type recipe_ingredientsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter which recipe_ingredients to delete.
     */
    where: recipe_ingredientsWhereUniqueInput
  }

  /**
   * recipe_ingredients deleteMany
   */
  export type recipe_ingredientsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which recipe_ingredients to delete
     */
    where?: recipe_ingredientsWhereInput
    /**
     * Limit how many recipe_ingredients to delete.
     */
    limit?: number
  }

  /**
   * recipe_ingredients without action
   */
  export type recipe_ingredientsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipe_ingredients
     */
    select?: recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipe_ingredients
     */
    omit?: recipe_ingredientsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipe_ingredientsInclude<ExtArgs> | null
  }


  /**
   * Model component_category
   */

  export type AggregateComponent_category = {
    _count: Component_categoryCountAggregateOutputType | null
    _avg: Component_categoryAvgAggregateOutputType | null
    _sum: Component_categorySumAggregateOutputType | null
    _min: Component_categoryMinAggregateOutputType | null
    _max: Component_categoryMaxAggregateOutputType | null
  }

  export type Component_categoryAvgAggregateOutputType = {
    id: number | null
  }

  export type Component_categorySumAggregateOutputType = {
    id: number | null
  }

  export type Component_categoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type Component_categoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type Component_categoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type Component_categoryAvgAggregateInputType = {
    id?: true
  }

  export type Component_categorySumAggregateInputType = {
    id?: true
  }

  export type Component_categoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type Component_categoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type Component_categoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type Component_categoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which component_category to aggregate.
     */
    where?: component_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_categories to fetch.
     */
    orderBy?: component_categoryOrderByWithRelationInput | component_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: component_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned component_categories
    **/
    _count?: true | Component_categoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Component_categoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Component_categorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Component_categoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Component_categoryMaxAggregateInputType
  }

  export type GetComponent_categoryAggregateType<T extends Component_categoryAggregateArgs> = {
        [P in keyof T & keyof AggregateComponent_category]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComponent_category[P]>
      : GetScalarType<T[P], AggregateComponent_category[P]>
  }




  export type component_categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: component_categoryWhereInput
    orderBy?: component_categoryOrderByWithAggregationInput | component_categoryOrderByWithAggregationInput[]
    by: Component_categoryScalarFieldEnum[] | Component_categoryScalarFieldEnum
    having?: component_categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Component_categoryCountAggregateInputType | true
    _avg?: Component_categoryAvgAggregateInputType
    _sum?: Component_categorySumAggregateInputType
    _min?: Component_categoryMinAggregateInputType
    _max?: Component_categoryMaxAggregateInputType
  }

  export type Component_categoryGroupByOutputType = {
    id: number
    name: string
    _count: Component_categoryCountAggregateOutputType | null
    _avg: Component_categoryAvgAggregateOutputType | null
    _sum: Component_categorySumAggregateOutputType | null
    _min: Component_categoryMinAggregateOutputType | null
    _max: Component_categoryMaxAggregateOutputType | null
  }

  type GetComponent_categoryGroupByPayload<T extends component_categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Component_categoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Component_categoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Component_categoryGroupByOutputType[P]>
            : GetScalarType<T[P], Component_categoryGroupByOutputType[P]>
        }
      >
    >


  export type component_categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    components?: boolean | component_category$componentsArgs<ExtArgs>
    _count?: boolean | Component_categoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["component_category"]>

  export type component_categorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["component_category"]>

  export type component_categorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["component_category"]>

  export type component_categorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type component_categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["component_category"]>
  export type component_categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    components?: boolean | component_category$componentsArgs<ExtArgs>
    _count?: boolean | Component_categoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type component_categoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type component_categoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $component_categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "component_category"
    objects: {
      components: Prisma.$componentsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["component_category"]>
    composites: {}
  }

  type component_categoryGetPayload<S extends boolean | null | undefined | component_categoryDefaultArgs> = $Result.GetResult<Prisma.$component_categoryPayload, S>

  type component_categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<component_categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Component_categoryCountAggregateInputType | true
    }

  export interface component_categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['component_category'], meta: { name: 'component_category' } }
    /**
     * Find zero or one Component_category that matches the filter.
     * @param {component_categoryFindUniqueArgs} args - Arguments to find a Component_category
     * @example
     * // Get one Component_category
     * const component_category = await prisma.component_category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends component_categoryFindUniqueArgs>(args: SelectSubset<T, component_categoryFindUniqueArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Component_category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {component_categoryFindUniqueOrThrowArgs} args - Arguments to find a Component_category
     * @example
     * // Get one Component_category
     * const component_category = await prisma.component_category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends component_categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, component_categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Component_category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_categoryFindFirstArgs} args - Arguments to find a Component_category
     * @example
     * // Get one Component_category
     * const component_category = await prisma.component_category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends component_categoryFindFirstArgs>(args?: SelectSubset<T, component_categoryFindFirstArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Component_category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_categoryFindFirstOrThrowArgs} args - Arguments to find a Component_category
     * @example
     * // Get one Component_category
     * const component_category = await prisma.component_category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends component_categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, component_categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Component_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Component_categories
     * const component_categories = await prisma.component_category.findMany()
     * 
     * // Get first 10 Component_categories
     * const component_categories = await prisma.component_category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const component_categoryWithIdOnly = await prisma.component_category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends component_categoryFindManyArgs>(args?: SelectSubset<T, component_categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Component_category.
     * @param {component_categoryCreateArgs} args - Arguments to create a Component_category.
     * @example
     * // Create one Component_category
     * const Component_category = await prisma.component_category.create({
     *   data: {
     *     // ... data to create a Component_category
     *   }
     * })
     * 
     */
    create<T extends component_categoryCreateArgs>(args: SelectSubset<T, component_categoryCreateArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Component_categories.
     * @param {component_categoryCreateManyArgs} args - Arguments to create many Component_categories.
     * @example
     * // Create many Component_categories
     * const component_category = await prisma.component_category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends component_categoryCreateManyArgs>(args?: SelectSubset<T, component_categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Component_categories and returns the data saved in the database.
     * @param {component_categoryCreateManyAndReturnArgs} args - Arguments to create many Component_categories.
     * @example
     * // Create many Component_categories
     * const component_category = await prisma.component_category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Component_categories and only return the `id`
     * const component_categoryWithIdOnly = await prisma.component_category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends component_categoryCreateManyAndReturnArgs>(args?: SelectSubset<T, component_categoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Component_category.
     * @param {component_categoryDeleteArgs} args - Arguments to delete one Component_category.
     * @example
     * // Delete one Component_category
     * const Component_category = await prisma.component_category.delete({
     *   where: {
     *     // ... filter to delete one Component_category
     *   }
     * })
     * 
     */
    delete<T extends component_categoryDeleteArgs>(args: SelectSubset<T, component_categoryDeleteArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Component_category.
     * @param {component_categoryUpdateArgs} args - Arguments to update one Component_category.
     * @example
     * // Update one Component_category
     * const component_category = await prisma.component_category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends component_categoryUpdateArgs>(args: SelectSubset<T, component_categoryUpdateArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Component_categories.
     * @param {component_categoryDeleteManyArgs} args - Arguments to filter Component_categories to delete.
     * @example
     * // Delete a few Component_categories
     * const { count } = await prisma.component_category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends component_categoryDeleteManyArgs>(args?: SelectSubset<T, component_categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Component_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Component_categories
     * const component_category = await prisma.component_category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends component_categoryUpdateManyArgs>(args: SelectSubset<T, component_categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Component_categories and returns the data updated in the database.
     * @param {component_categoryUpdateManyAndReturnArgs} args - Arguments to update many Component_categories.
     * @example
     * // Update many Component_categories
     * const component_category = await prisma.component_category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Component_categories and only return the `id`
     * const component_categoryWithIdOnly = await prisma.component_category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends component_categoryUpdateManyAndReturnArgs>(args: SelectSubset<T, component_categoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Component_category.
     * @param {component_categoryUpsertArgs} args - Arguments to update or create a Component_category.
     * @example
     * // Update or create a Component_category
     * const component_category = await prisma.component_category.upsert({
     *   create: {
     *     // ... data to create a Component_category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Component_category we want to update
     *   }
     * })
     */
    upsert<T extends component_categoryUpsertArgs>(args: SelectSubset<T, component_categoryUpsertArgs<ExtArgs>>): Prisma__component_categoryClient<$Result.GetResult<Prisma.$component_categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Component_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_categoryCountArgs} args - Arguments to filter Component_categories to count.
     * @example
     * // Count the number of Component_categories
     * const count = await prisma.component_category.count({
     *   where: {
     *     // ... the filter for the Component_categories we want to count
     *   }
     * })
    **/
    count<T extends component_categoryCountArgs>(
      args?: Subset<T, component_categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Component_categoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Component_category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Component_categoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Component_categoryAggregateArgs>(args: Subset<T, Component_categoryAggregateArgs>): Prisma.PrismaPromise<GetComponent_categoryAggregateType<T>>

    /**
     * Group by Component_category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {component_categoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends component_categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: component_categoryGroupByArgs['orderBy'] }
        : { orderBy?: component_categoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, component_categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComponent_categoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the component_category model
   */
  readonly fields: component_categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for component_category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__component_categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    components<T extends component_category$componentsArgs<ExtArgs> = {}>(args?: Subset<T, component_category$componentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$componentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the component_category model
   */
  interface component_categoryFieldRefs {
    readonly id: FieldRef<"component_category", 'Int'>
    readonly name: FieldRef<"component_category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * component_category findUnique
   */
  export type component_categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * Filter, which component_category to fetch.
     */
    where: component_categoryWhereUniqueInput
  }

  /**
   * component_category findUniqueOrThrow
   */
  export type component_categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * Filter, which component_category to fetch.
     */
    where: component_categoryWhereUniqueInput
  }

  /**
   * component_category findFirst
   */
  export type component_categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * Filter, which component_category to fetch.
     */
    where?: component_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_categories to fetch.
     */
    orderBy?: component_categoryOrderByWithRelationInput | component_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for component_categories.
     */
    cursor?: component_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of component_categories.
     */
    distinct?: Component_categoryScalarFieldEnum | Component_categoryScalarFieldEnum[]
  }

  /**
   * component_category findFirstOrThrow
   */
  export type component_categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * Filter, which component_category to fetch.
     */
    where?: component_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_categories to fetch.
     */
    orderBy?: component_categoryOrderByWithRelationInput | component_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for component_categories.
     */
    cursor?: component_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of component_categories.
     */
    distinct?: Component_categoryScalarFieldEnum | Component_categoryScalarFieldEnum[]
  }

  /**
   * component_category findMany
   */
  export type component_categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * Filter, which component_categories to fetch.
     */
    where?: component_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of component_categories to fetch.
     */
    orderBy?: component_categoryOrderByWithRelationInput | component_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing component_categories.
     */
    cursor?: component_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` component_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` component_categories.
     */
    skip?: number
    distinct?: Component_categoryScalarFieldEnum | Component_categoryScalarFieldEnum[]
  }

  /**
   * component_category create
   */
  export type component_categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a component_category.
     */
    data: XOR<component_categoryCreateInput, component_categoryUncheckedCreateInput>
  }

  /**
   * component_category createMany
   */
  export type component_categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many component_categories.
     */
    data: component_categoryCreateManyInput | component_categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * component_category createManyAndReturn
   */
  export type component_categoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * The data used to create many component_categories.
     */
    data: component_categoryCreateManyInput | component_categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * component_category update
   */
  export type component_categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a component_category.
     */
    data: XOR<component_categoryUpdateInput, component_categoryUncheckedUpdateInput>
    /**
     * Choose, which component_category to update.
     */
    where: component_categoryWhereUniqueInput
  }

  /**
   * component_category updateMany
   */
  export type component_categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update component_categories.
     */
    data: XOR<component_categoryUpdateManyMutationInput, component_categoryUncheckedUpdateManyInput>
    /**
     * Filter which component_categories to update
     */
    where?: component_categoryWhereInput
    /**
     * Limit how many component_categories to update.
     */
    limit?: number
  }

  /**
   * component_category updateManyAndReturn
   */
  export type component_categoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * The data used to update component_categories.
     */
    data: XOR<component_categoryUpdateManyMutationInput, component_categoryUncheckedUpdateManyInput>
    /**
     * Filter which component_categories to update
     */
    where?: component_categoryWhereInput
    /**
     * Limit how many component_categories to update.
     */
    limit?: number
  }

  /**
   * component_category upsert
   */
  export type component_categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the component_category to update in case it exists.
     */
    where: component_categoryWhereUniqueInput
    /**
     * In case the component_category found by the `where` argument doesn't exist, create a new component_category with this data.
     */
    create: XOR<component_categoryCreateInput, component_categoryUncheckedCreateInput>
    /**
     * In case the component_category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<component_categoryUpdateInput, component_categoryUncheckedUpdateInput>
  }

  /**
   * component_category delete
   */
  export type component_categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
    /**
     * Filter which component_category to delete.
     */
    where: component_categoryWhereUniqueInput
  }

  /**
   * component_category deleteMany
   */
  export type component_categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which component_categories to delete
     */
    where?: component_categoryWhereInput
    /**
     * Limit how many component_categories to delete.
     */
    limit?: number
  }

  /**
   * component_category.components
   */
  export type component_category$componentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the components
     */
    select?: componentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the components
     */
    omit?: componentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: componentsInclude<ExtArgs> | null
    where?: componentsWhereInput
    orderBy?: componentsOrderByWithRelationInput | componentsOrderByWithRelationInput[]
    cursor?: componentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComponentsScalarFieldEnum | ComponentsScalarFieldEnum[]
  }

  /**
   * component_category without action
   */
  export type component_categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the component_category
     */
    select?: component_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the component_category
     */
    omit?: component_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: component_categoryInclude<ExtArgs> | null
  }


  /**
   * Model SystemConfig
   */

  export type AggregateSystemConfig = {
    _count: SystemConfigCountAggregateOutputType | null
    _avg: SystemConfigAvgAggregateOutputType | null
    _sum: SystemConfigSumAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  export type SystemConfigAvgAggregateOutputType = {
    id: number | null
  }

  export type SystemConfigSumAggregateOutputType = {
    id: number | null
  }

  export type SystemConfigMinAggregateOutputType = {
    id: number | null
    config_key: string | null
    config_value: string | null
    description: string | null
    updated_at: Date | null
  }

  export type SystemConfigMaxAggregateOutputType = {
    id: number | null
    config_key: string | null
    config_value: string | null
    description: string | null
    updated_at: Date | null
  }

  export type SystemConfigCountAggregateOutputType = {
    id: number
    config_key: number
    config_value: number
    description: number
    updated_at: number
    _all: number
  }


  export type SystemConfigAvgAggregateInputType = {
    id?: true
  }

  export type SystemConfigSumAggregateInputType = {
    id?: true
  }

  export type SystemConfigMinAggregateInputType = {
    id?: true
    config_key?: true
    config_value?: true
    description?: true
    updated_at?: true
  }

  export type SystemConfigMaxAggregateInputType = {
    id?: true
    config_key?: true
    config_value?: true
    description?: true
    updated_at?: true
  }

  export type SystemConfigCountAggregateInputType = {
    id?: true
    config_key?: true
    config_value?: true
    description?: true
    updated_at?: true
    _all?: true
  }

  export type SystemConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfig to aggregate.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemConfigs
    **/
    _count?: true | SystemConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SystemConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SystemConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemConfigMaxAggregateInputType
  }

  export type GetSystemConfigAggregateType<T extends SystemConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemConfig[P]>
      : GetScalarType<T[P], AggregateSystemConfig[P]>
  }




  export type SystemConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemConfigWhereInput
    orderBy?: SystemConfigOrderByWithAggregationInput | SystemConfigOrderByWithAggregationInput[]
    by: SystemConfigScalarFieldEnum[] | SystemConfigScalarFieldEnum
    having?: SystemConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemConfigCountAggregateInputType | true
    _avg?: SystemConfigAvgAggregateInputType
    _sum?: SystemConfigSumAggregateInputType
    _min?: SystemConfigMinAggregateInputType
    _max?: SystemConfigMaxAggregateInputType
  }

  export type SystemConfigGroupByOutputType = {
    id: number
    config_key: string
    config_value: string
    description: string | null
    updated_at: Date
    _count: SystemConfigCountAggregateOutputType | null
    _avg: SystemConfigAvgAggregateOutputType | null
    _sum: SystemConfigSumAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  type GetSystemConfigGroupByPayload<T extends SystemConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
        }
      >
    >


  export type SystemConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    config_key?: boolean
    config_value?: boolean
    description?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    config_key?: boolean
    config_value?: boolean
    description?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    config_key?: boolean
    config_value?: boolean
    description?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectScalar = {
    id?: boolean
    config_key?: boolean
    config_value?: boolean
    description?: boolean
    updated_at?: boolean
  }

  export type SystemConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "config_key" | "config_value" | "description" | "updated_at", ExtArgs["result"]["systemConfig"]>

  export type $SystemConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      config_key: string
      config_value: string
      description: string | null
      updated_at: Date
    }, ExtArgs["result"]["systemConfig"]>
    composites: {}
  }

  type SystemConfigGetPayload<S extends boolean | null | undefined | SystemConfigDefaultArgs> = $Result.GetResult<Prisma.$SystemConfigPayload, S>

  type SystemConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemConfigCountAggregateInputType | true
    }

  export interface SystemConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemConfig'], meta: { name: 'SystemConfig' } }
    /**
     * Find zero or one SystemConfig that matches the filter.
     * @param {SystemConfigFindUniqueArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemConfigFindUniqueArgs>(args: SelectSubset<T, SystemConfigFindUniqueArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemConfigFindUniqueOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemConfigFindFirstArgs>(args?: SelectSubset<T, SystemConfigFindFirstArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany()
     * 
     * // Get first 10 SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemConfigFindManyArgs>(args?: SelectSubset<T, SystemConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemConfig.
     * @param {SystemConfigCreateArgs} args - Arguments to create a SystemConfig.
     * @example
     * // Create one SystemConfig
     * const SystemConfig = await prisma.systemConfig.create({
     *   data: {
     *     // ... data to create a SystemConfig
     *   }
     * })
     * 
     */
    create<T extends SystemConfigCreateArgs>(args: SelectSubset<T, SystemConfigCreateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemConfigs.
     * @param {SystemConfigCreateManyArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemConfigCreateManyArgs>(args?: SelectSubset<T, SystemConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemConfigs and returns the data saved in the database.
     * @param {SystemConfigCreateManyAndReturnArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemConfig.
     * @param {SystemConfigDeleteArgs} args - Arguments to delete one SystemConfig.
     * @example
     * // Delete one SystemConfig
     * const SystemConfig = await prisma.systemConfig.delete({
     *   where: {
     *     // ... filter to delete one SystemConfig
     *   }
     * })
     * 
     */
    delete<T extends SystemConfigDeleteArgs>(args: SelectSubset<T, SystemConfigDeleteArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemConfig.
     * @param {SystemConfigUpdateArgs} args - Arguments to update one SystemConfig.
     * @example
     * // Update one SystemConfig
     * const systemConfig = await prisma.systemConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemConfigUpdateArgs>(args: SelectSubset<T, SystemConfigUpdateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemConfigs.
     * @param {SystemConfigDeleteManyArgs} args - Arguments to filter SystemConfigs to delete.
     * @example
     * // Delete a few SystemConfigs
     * const { count } = await prisma.systemConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemConfigDeleteManyArgs>(args?: SelectSubset<T, SystemConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemConfigUpdateManyArgs>(args: SelectSubset<T, SystemConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs and returns the data updated in the database.
     * @param {SystemConfigUpdateManyAndReturnArgs} args - Arguments to update many SystemConfigs.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemConfig.
     * @param {SystemConfigUpsertArgs} args - Arguments to update or create a SystemConfig.
     * @example
     * // Update or create a SystemConfig
     * const systemConfig = await prisma.systemConfig.upsert({
     *   create: {
     *     // ... data to create a SystemConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemConfig we want to update
     *   }
     * })
     */
    upsert<T extends SystemConfigUpsertArgs>(args: SelectSubset<T, SystemConfigUpsertArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigCountArgs} args - Arguments to filter SystemConfigs to count.
     * @example
     * // Count the number of SystemConfigs
     * const count = await prisma.systemConfig.count({
     *   where: {
     *     // ... the filter for the SystemConfigs we want to count
     *   }
     * })
    **/
    count<T extends SystemConfigCountArgs>(
      args?: Subset<T, SystemConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemConfigAggregateArgs>(args: Subset<T, SystemConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAggregateType<T>>

    /**
     * Group by SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemConfigGroupByArgs['orderBy'] }
        : { orderBy?: SystemConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemConfig model
   */
  readonly fields: SystemConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemConfig model
   */
  interface SystemConfigFieldRefs {
    readonly id: FieldRef<"SystemConfig", 'Int'>
    readonly config_key: FieldRef<"SystemConfig", 'String'>
    readonly config_value: FieldRef<"SystemConfig", 'String'>
    readonly description: FieldRef<"SystemConfig", 'String'>
    readonly updated_at: FieldRef<"SystemConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemConfig findUnique
   */
  export type SystemConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findUniqueOrThrow
   */
  export type SystemConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findFirst
   */
  export type SystemConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findFirstOrThrow
   */
  export type SystemConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findMany
   */
  export type SystemConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfigs to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig create
   */
  export type SystemConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemConfig.
     */
    data: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
  }

  /**
   * SystemConfig createMany
   */
  export type SystemConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig createManyAndReturn
   */
  export type SystemConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig update
   */
  export type SystemConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemConfig.
     */
    data: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
    /**
     * Choose, which SystemConfig to update.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig updateMany
   */
  export type SystemConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig updateManyAndReturn
   */
  export type SystemConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig upsert
   */
  export type SystemConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemConfig to update in case it exists.
     */
    where: SystemConfigWhereUniqueInput
    /**
     * In case the SystemConfig found by the `where` argument doesn't exist, create a new SystemConfig with this data.
     */
    create: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
    /**
     * In case the SystemConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
  }

  /**
   * SystemConfig delete
   */
  export type SystemConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter which SystemConfig to delete.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig deleteMany
   */
  export type SystemConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfigs to delete
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to delete.
     */
    limit?: number
  }

  /**
   * SystemConfig without action
   */
  export type SystemConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ComponentsScalarFieldEnum: {
    component_id: 'component_id',
    meal_id: 'meal_id',
    component_name: 'component_name',
    before_cook_weight_g: 'before_cook_weight_g',
    after_cook_weight_g: 'after_cook_weight_g',
    created_at: 'created_at',
    updated_at: 'updated_at',
    category_id: 'category_id'
  };

  export type ComponentsScalarFieldEnum = (typeof ComponentsScalarFieldEnum)[keyof typeof ComponentsScalarFieldEnum]


  export const Component_portionsScalarFieldEnum: {
    portion_id: 'portion_id',
    component_id: 'component_id',
    label: 'label',
    total_weight_g: 'total_weight_g',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Component_portionsScalarFieldEnum = (typeof Component_portionsScalarFieldEnum)[keyof typeof Component_portionsScalarFieldEnum]


  export const IngredientsScalarFieldEnum: {
    ingredient_id: 'ingredient_id',
    ingredient_name: 'ingredient_name',
    default_unit: 'default_unit',
    calories_per_100g: 'calories_per_100g',
    fat_g: 'fat_g',
    protein_g: 'protein_g',
    carbohydrates_g: 'carbohydrates_g',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type IngredientsScalarFieldEnum = (typeof IngredientsScalarFieldEnum)[keyof typeof IngredientsScalarFieldEnum]


  export const MealsScalarFieldEnum: {
    meal_id: 'meal_id',
    meal_name: 'meal_name',
    description: 'description',
    is_balanced: 'is_balanced',
    is_gourmet: 'is_gourmet',
    is_weight_loss: 'is_weight_loss',
    package: 'package',
    objective: 'objective',
    item_code: 'item_code',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MealsScalarFieldEnum = (typeof MealsScalarFieldEnum)[keyof typeof MealsScalarFieldEnum]


  export const Portion_optionsScalarFieldEnum: {
    portion_id: 'portion_id',
    meal_id: 'meal_id',
    size_name: 'size_name',
    multiplier: 'multiplier',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Portion_optionsScalarFieldEnum = (typeof Portion_optionsScalarFieldEnum)[keyof typeof Portion_optionsScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const Recipe_ingredientsScalarFieldEnum: {
    component_id: 'component_id',
    ingredient_id: 'ingredient_id',
    raw_quantity_g: 'raw_quantity_g',
    cooked_quantity_g: 'cooked_quantity_g',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Recipe_ingredientsScalarFieldEnum = (typeof Recipe_ingredientsScalarFieldEnum)[keyof typeof Recipe_ingredientsScalarFieldEnum]


  export const Component_categoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type Component_categoryScalarFieldEnum = (typeof Component_categoryScalarFieldEnum)[keyof typeof Component_categoryScalarFieldEnum]


  export const SystemConfigScalarFieldEnum: {
    id: 'id',
    config_key: 'config_key',
    config_value: 'config_value',
    description: 'description',
    updated_at: 'updated_at'
  };

  export type SystemConfigScalarFieldEnum = (typeof SystemConfigScalarFieldEnum)[keyof typeof SystemConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type componentsWhereInput = {
    AND?: componentsWhereInput | componentsWhereInput[]
    OR?: componentsWhereInput[]
    NOT?: componentsWhereInput | componentsWhereInput[]
    component_id?: IntFilter<"components"> | number
    meal_id?: IntNullableFilter<"components"> | number | null
    component_name?: StringFilter<"components"> | string
    before_cook_weight_g?: DecimalNullableFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: DecimalNullableFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"components"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"components"> | Date | string | null
    category_id?: IntNullableFilter<"components"> | number | null
    meals?: XOR<MealsNullableScalarRelationFilter, mealsWhereInput> | null
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
    component_portions?: Component_portionsListRelationFilter
    category?: XOR<Component_categoryNullableScalarRelationFilter, component_categoryWhereInput> | null
  }

  export type componentsOrderByWithRelationInput = {
    component_id?: SortOrder
    meal_id?: SortOrderInput | SortOrder
    component_name?: SortOrder
    before_cook_weight_g?: SortOrderInput | SortOrder
    after_cook_weight_g?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    category_id?: SortOrderInput | SortOrder
    meals?: mealsOrderByWithRelationInput
    recipe_ingredients?: recipe_ingredientsOrderByRelationAggregateInput
    component_portions?: component_portionsOrderByRelationAggregateInput
    category?: component_categoryOrderByWithRelationInput
  }

  export type componentsWhereUniqueInput = Prisma.AtLeast<{
    component_id?: number
    AND?: componentsWhereInput | componentsWhereInput[]
    OR?: componentsWhereInput[]
    NOT?: componentsWhereInput | componentsWhereInput[]
    meal_id?: IntNullableFilter<"components"> | number | null
    component_name?: StringFilter<"components"> | string
    before_cook_weight_g?: DecimalNullableFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: DecimalNullableFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"components"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"components"> | Date | string | null
    category_id?: IntNullableFilter<"components"> | number | null
    meals?: XOR<MealsNullableScalarRelationFilter, mealsWhereInput> | null
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
    component_portions?: Component_portionsListRelationFilter
    category?: XOR<Component_categoryNullableScalarRelationFilter, component_categoryWhereInput> | null
  }, "component_id">

  export type componentsOrderByWithAggregationInput = {
    component_id?: SortOrder
    meal_id?: SortOrderInput | SortOrder
    component_name?: SortOrder
    before_cook_weight_g?: SortOrderInput | SortOrder
    after_cook_weight_g?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    category_id?: SortOrderInput | SortOrder
    _count?: componentsCountOrderByAggregateInput
    _avg?: componentsAvgOrderByAggregateInput
    _max?: componentsMaxOrderByAggregateInput
    _min?: componentsMinOrderByAggregateInput
    _sum?: componentsSumOrderByAggregateInput
  }

  export type componentsScalarWhereWithAggregatesInput = {
    AND?: componentsScalarWhereWithAggregatesInput | componentsScalarWhereWithAggregatesInput[]
    OR?: componentsScalarWhereWithAggregatesInput[]
    NOT?: componentsScalarWhereWithAggregatesInput | componentsScalarWhereWithAggregatesInput[]
    component_id?: IntWithAggregatesFilter<"components"> | number
    meal_id?: IntNullableWithAggregatesFilter<"components"> | number | null
    component_name?: StringWithAggregatesFilter<"components"> | string
    before_cook_weight_g?: DecimalNullableWithAggregatesFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: DecimalNullableWithAggregatesFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"components"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"components"> | Date | string | null
    category_id?: IntNullableWithAggregatesFilter<"components"> | number | null
  }

  export type component_portionsWhereInput = {
    AND?: component_portionsWhereInput | component_portionsWhereInput[]
    OR?: component_portionsWhereInput[]
    NOT?: component_portionsWhereInput | component_portionsWhereInput[]
    portion_id?: IntFilter<"component_portions"> | number
    component_id?: IntFilter<"component_portions"> | number
    label?: StringFilter<"component_portions"> | string
    total_weight_g?: DecimalFilter<"component_portions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"component_portions"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"component_portions"> | Date | string | null
    components?: XOR<ComponentsScalarRelationFilter, componentsWhereInput>
  }

  export type component_portionsOrderByWithRelationInput = {
    portion_id?: SortOrder
    component_id?: SortOrder
    label?: SortOrder
    total_weight_g?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    components?: componentsOrderByWithRelationInput
  }

  export type component_portionsWhereUniqueInput = Prisma.AtLeast<{
    portion_id?: number
    component_id_label?: component_portionsComponent_idLabelCompoundUniqueInput
    AND?: component_portionsWhereInput | component_portionsWhereInput[]
    OR?: component_portionsWhereInput[]
    NOT?: component_portionsWhereInput | component_portionsWhereInput[]
    component_id?: IntFilter<"component_portions"> | number
    label?: StringFilter<"component_portions"> | string
    total_weight_g?: DecimalFilter<"component_portions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"component_portions"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"component_portions"> | Date | string | null
    components?: XOR<ComponentsScalarRelationFilter, componentsWhereInput>
  }, "portion_id" | "component_id_label">

  export type component_portionsOrderByWithAggregationInput = {
    portion_id?: SortOrder
    component_id?: SortOrder
    label?: SortOrder
    total_weight_g?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: component_portionsCountOrderByAggregateInput
    _avg?: component_portionsAvgOrderByAggregateInput
    _max?: component_portionsMaxOrderByAggregateInput
    _min?: component_portionsMinOrderByAggregateInput
    _sum?: component_portionsSumOrderByAggregateInput
  }

  export type component_portionsScalarWhereWithAggregatesInput = {
    AND?: component_portionsScalarWhereWithAggregatesInput | component_portionsScalarWhereWithAggregatesInput[]
    OR?: component_portionsScalarWhereWithAggregatesInput[]
    NOT?: component_portionsScalarWhereWithAggregatesInput | component_portionsScalarWhereWithAggregatesInput[]
    portion_id?: IntWithAggregatesFilter<"component_portions"> | number
    component_id?: IntWithAggregatesFilter<"component_portions"> | number
    label?: StringWithAggregatesFilter<"component_portions"> | string
    total_weight_g?: DecimalWithAggregatesFilter<"component_portions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableWithAggregatesFilter<"component_portions"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"component_portions"> | Date | string | null
  }

  export type ingredientsWhereInput = {
    AND?: ingredientsWhereInput | ingredientsWhereInput[]
    OR?: ingredientsWhereInput[]
    NOT?: ingredientsWhereInput | ingredientsWhereInput[]
    ingredient_id?: IntFilter<"ingredients"> | number
    ingredient_name?: StringFilter<"ingredients"> | string
    default_unit?: StringFilter<"ingredients"> | string
    calories_per_100g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"ingredients"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"ingredients"> | Date | string | null
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
  }

  export type ingredientsOrderByWithRelationInput = {
    ingredient_id?: SortOrder
    ingredient_name?: SortOrder
    default_unit?: SortOrder
    calories_per_100g?: SortOrder
    fat_g?: SortOrder
    protein_g?: SortOrder
    carbohydrates_g?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    recipe_ingredients?: recipe_ingredientsOrderByRelationAggregateInput
  }

  export type ingredientsWhereUniqueInput = Prisma.AtLeast<{
    ingredient_id?: number
    ingredient_name?: string
    AND?: ingredientsWhereInput | ingredientsWhereInput[]
    OR?: ingredientsWhereInput[]
    NOT?: ingredientsWhereInput | ingredientsWhereInput[]
    default_unit?: StringFilter<"ingredients"> | string
    calories_per_100g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"ingredients"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"ingredients"> | Date | string | null
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
  }, "ingredient_id" | "ingredient_name">

  export type ingredientsOrderByWithAggregationInput = {
    ingredient_id?: SortOrder
    ingredient_name?: SortOrder
    default_unit?: SortOrder
    calories_per_100g?: SortOrder
    fat_g?: SortOrder
    protein_g?: SortOrder
    carbohydrates_g?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: ingredientsCountOrderByAggregateInput
    _avg?: ingredientsAvgOrderByAggregateInput
    _max?: ingredientsMaxOrderByAggregateInput
    _min?: ingredientsMinOrderByAggregateInput
    _sum?: ingredientsSumOrderByAggregateInput
  }

  export type ingredientsScalarWhereWithAggregatesInput = {
    AND?: ingredientsScalarWhereWithAggregatesInput | ingredientsScalarWhereWithAggregatesInput[]
    OR?: ingredientsScalarWhereWithAggregatesInput[]
    NOT?: ingredientsScalarWhereWithAggregatesInput | ingredientsScalarWhereWithAggregatesInput[]
    ingredient_id?: IntWithAggregatesFilter<"ingredients"> | number
    ingredient_name?: StringWithAggregatesFilter<"ingredients"> | string
    default_unit?: StringWithAggregatesFilter<"ingredients"> | string
    calories_per_100g?: DecimalWithAggregatesFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalWithAggregatesFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalWithAggregatesFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalWithAggregatesFilter<"ingredients"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableWithAggregatesFilter<"ingredients"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"ingredients"> | Date | string | null
  }

  export type mealsWhereInput = {
    AND?: mealsWhereInput | mealsWhereInput[]
    OR?: mealsWhereInput[]
    NOT?: mealsWhereInput | mealsWhereInput[]
    meal_id?: IntFilter<"meals"> | number
    meal_name?: StringFilter<"meals"> | string
    description?: StringNullableFilter<"meals"> | string | null
    is_balanced?: BoolFilter<"meals"> | boolean
    is_gourmet?: BoolFilter<"meals"> | boolean
    is_weight_loss?: BoolFilter<"meals"> | boolean
    package?: StringNullableFilter<"meals"> | string | null
    objective?: StringNullableFilter<"meals"> | string | null
    item_code?: StringNullableFilter<"meals"> | string | null
    created_at?: DateTimeNullableFilter<"meals"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"meals"> | Date | string | null
    components?: ComponentsListRelationFilter
    portion_options?: Portion_optionsListRelationFilter
  }

  export type mealsOrderByWithRelationInput = {
    meal_id?: SortOrder
    meal_name?: SortOrder
    description?: SortOrderInput | SortOrder
    is_balanced?: SortOrder
    is_gourmet?: SortOrder
    is_weight_loss?: SortOrder
    package?: SortOrderInput | SortOrder
    objective?: SortOrderInput | SortOrder
    item_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    components?: componentsOrderByRelationAggregateInput
    portion_options?: portion_optionsOrderByRelationAggregateInput
  }

  export type mealsWhereUniqueInput = Prisma.AtLeast<{
    meal_id?: number
    meal_name?: string
    AND?: mealsWhereInput | mealsWhereInput[]
    OR?: mealsWhereInput[]
    NOT?: mealsWhereInput | mealsWhereInput[]
    description?: StringNullableFilter<"meals"> | string | null
    is_balanced?: BoolFilter<"meals"> | boolean
    is_gourmet?: BoolFilter<"meals"> | boolean
    is_weight_loss?: BoolFilter<"meals"> | boolean
    package?: StringNullableFilter<"meals"> | string | null
    objective?: StringNullableFilter<"meals"> | string | null
    item_code?: StringNullableFilter<"meals"> | string | null
    created_at?: DateTimeNullableFilter<"meals"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"meals"> | Date | string | null
    components?: ComponentsListRelationFilter
    portion_options?: Portion_optionsListRelationFilter
  }, "meal_id" | "meal_name">

  export type mealsOrderByWithAggregationInput = {
    meal_id?: SortOrder
    meal_name?: SortOrder
    description?: SortOrderInput | SortOrder
    is_balanced?: SortOrder
    is_gourmet?: SortOrder
    is_weight_loss?: SortOrder
    package?: SortOrderInput | SortOrder
    objective?: SortOrderInput | SortOrder
    item_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: mealsCountOrderByAggregateInput
    _avg?: mealsAvgOrderByAggregateInput
    _max?: mealsMaxOrderByAggregateInput
    _min?: mealsMinOrderByAggregateInput
    _sum?: mealsSumOrderByAggregateInput
  }

  export type mealsScalarWhereWithAggregatesInput = {
    AND?: mealsScalarWhereWithAggregatesInput | mealsScalarWhereWithAggregatesInput[]
    OR?: mealsScalarWhereWithAggregatesInput[]
    NOT?: mealsScalarWhereWithAggregatesInput | mealsScalarWhereWithAggregatesInput[]
    meal_id?: IntWithAggregatesFilter<"meals"> | number
    meal_name?: StringWithAggregatesFilter<"meals"> | string
    description?: StringNullableWithAggregatesFilter<"meals"> | string | null
    is_balanced?: BoolWithAggregatesFilter<"meals"> | boolean
    is_gourmet?: BoolWithAggregatesFilter<"meals"> | boolean
    is_weight_loss?: BoolWithAggregatesFilter<"meals"> | boolean
    package?: StringNullableWithAggregatesFilter<"meals"> | string | null
    objective?: StringNullableWithAggregatesFilter<"meals"> | string | null
    item_code?: StringNullableWithAggregatesFilter<"meals"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"meals"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"meals"> | Date | string | null
  }

  export type portion_optionsWhereInput = {
    AND?: portion_optionsWhereInput | portion_optionsWhereInput[]
    OR?: portion_optionsWhereInput[]
    NOT?: portion_optionsWhereInput | portion_optionsWhereInput[]
    portion_id?: IntFilter<"portion_options"> | number
    meal_id?: IntNullableFilter<"portion_options"> | number | null
    size_name?: StringFilter<"portion_options"> | string
    multiplier?: DecimalFilter<"portion_options"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"portion_options"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"portion_options"> | Date | string | null
    meals?: XOR<MealsNullableScalarRelationFilter, mealsWhereInput> | null
  }

  export type portion_optionsOrderByWithRelationInput = {
    portion_id?: SortOrder
    meal_id?: SortOrderInput | SortOrder
    size_name?: SortOrder
    multiplier?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    meals?: mealsOrderByWithRelationInput
  }

  export type portion_optionsWhereUniqueInput = Prisma.AtLeast<{
    portion_id?: number
    meal_id_size_name?: portion_optionsMeal_idSize_nameCompoundUniqueInput
    AND?: portion_optionsWhereInput | portion_optionsWhereInput[]
    OR?: portion_optionsWhereInput[]
    NOT?: portion_optionsWhereInput | portion_optionsWhereInput[]
    meal_id?: IntNullableFilter<"portion_options"> | number | null
    size_name?: StringFilter<"portion_options"> | string
    multiplier?: DecimalFilter<"portion_options"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"portion_options"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"portion_options"> | Date | string | null
    meals?: XOR<MealsNullableScalarRelationFilter, mealsWhereInput> | null
  }, "portion_id" | "meal_id_size_name">

  export type portion_optionsOrderByWithAggregationInput = {
    portion_id?: SortOrder
    meal_id?: SortOrderInput | SortOrder
    size_name?: SortOrder
    multiplier?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: portion_optionsCountOrderByAggregateInput
    _avg?: portion_optionsAvgOrderByAggregateInput
    _max?: portion_optionsMaxOrderByAggregateInput
    _min?: portion_optionsMinOrderByAggregateInput
    _sum?: portion_optionsSumOrderByAggregateInput
  }

  export type portion_optionsScalarWhereWithAggregatesInput = {
    AND?: portion_optionsScalarWhereWithAggregatesInput | portion_optionsScalarWhereWithAggregatesInput[]
    OR?: portion_optionsScalarWhereWithAggregatesInput[]
    NOT?: portion_optionsScalarWhereWithAggregatesInput | portion_optionsScalarWhereWithAggregatesInput[]
    portion_id?: IntWithAggregatesFilter<"portion_options"> | number
    meal_id?: IntNullableWithAggregatesFilter<"portion_options"> | number | null
    size_name?: StringWithAggregatesFilter<"portion_options"> | string
    multiplier?: DecimalWithAggregatesFilter<"portion_options"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableWithAggregatesFilter<"portion_options"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"portion_options"> | Date | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type recipe_ingredientsWhereInput = {
    AND?: recipe_ingredientsWhereInput | recipe_ingredientsWhereInput[]
    OR?: recipe_ingredientsWhereInput[]
    NOT?: recipe_ingredientsWhereInput | recipe_ingredientsWhereInput[]
    component_id?: IntFilter<"recipe_ingredients"> | number
    ingredient_id?: IntFilter<"recipe_ingredients"> | number
    raw_quantity_g?: DecimalFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: DecimalNullableFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"recipe_ingredients"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"recipe_ingredients"> | Date | string | null
    components?: XOR<ComponentsScalarRelationFilter, componentsWhereInput>
    ingredients?: XOR<IngredientsScalarRelationFilter, ingredientsWhereInput>
  }

  export type recipe_ingredientsOrderByWithRelationInput = {
    component_id?: SortOrder
    ingredient_id?: SortOrder
    raw_quantity_g?: SortOrder
    cooked_quantity_g?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    components?: componentsOrderByWithRelationInput
    ingredients?: ingredientsOrderByWithRelationInput
  }

  export type recipe_ingredientsWhereUniqueInput = Prisma.AtLeast<{
    component_id_ingredient_id?: recipe_ingredientsComponent_idIngredient_idCompoundUniqueInput
    AND?: recipe_ingredientsWhereInput | recipe_ingredientsWhereInput[]
    OR?: recipe_ingredientsWhereInput[]
    NOT?: recipe_ingredientsWhereInput | recipe_ingredientsWhereInput[]
    component_id?: IntFilter<"recipe_ingredients"> | number
    ingredient_id?: IntFilter<"recipe_ingredients"> | number
    raw_quantity_g?: DecimalFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: DecimalNullableFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"recipe_ingredients"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"recipe_ingredients"> | Date | string | null
    components?: XOR<ComponentsScalarRelationFilter, componentsWhereInput>
    ingredients?: XOR<IngredientsScalarRelationFilter, ingredientsWhereInput>
  }, "component_id_ingredient_id">

  export type recipe_ingredientsOrderByWithAggregationInput = {
    component_id?: SortOrder
    ingredient_id?: SortOrder
    raw_quantity_g?: SortOrder
    cooked_quantity_g?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: recipe_ingredientsCountOrderByAggregateInput
    _avg?: recipe_ingredientsAvgOrderByAggregateInput
    _max?: recipe_ingredientsMaxOrderByAggregateInput
    _min?: recipe_ingredientsMinOrderByAggregateInput
    _sum?: recipe_ingredientsSumOrderByAggregateInput
  }

  export type recipe_ingredientsScalarWhereWithAggregatesInput = {
    AND?: recipe_ingredientsScalarWhereWithAggregatesInput | recipe_ingredientsScalarWhereWithAggregatesInput[]
    OR?: recipe_ingredientsScalarWhereWithAggregatesInput[]
    NOT?: recipe_ingredientsScalarWhereWithAggregatesInput | recipe_ingredientsScalarWhereWithAggregatesInput[]
    component_id?: IntWithAggregatesFilter<"recipe_ingredients"> | number
    ingredient_id?: IntWithAggregatesFilter<"recipe_ingredients"> | number
    raw_quantity_g?: DecimalWithAggregatesFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: DecimalNullableWithAggregatesFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"recipe_ingredients"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"recipe_ingredients"> | Date | string | null
  }

  export type component_categoryWhereInput = {
    AND?: component_categoryWhereInput | component_categoryWhereInput[]
    OR?: component_categoryWhereInput[]
    NOT?: component_categoryWhereInput | component_categoryWhereInput[]
    id?: IntFilter<"component_category"> | number
    name?: StringFilter<"component_category"> | string
    components?: ComponentsListRelationFilter
  }

  export type component_categoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    components?: componentsOrderByRelationAggregateInput
  }

  export type component_categoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: component_categoryWhereInput | component_categoryWhereInput[]
    OR?: component_categoryWhereInput[]
    NOT?: component_categoryWhereInput | component_categoryWhereInput[]
    components?: ComponentsListRelationFilter
  }, "id" | "name">

  export type component_categoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: component_categoryCountOrderByAggregateInput
    _avg?: component_categoryAvgOrderByAggregateInput
    _max?: component_categoryMaxOrderByAggregateInput
    _min?: component_categoryMinOrderByAggregateInput
    _sum?: component_categorySumOrderByAggregateInput
  }

  export type component_categoryScalarWhereWithAggregatesInput = {
    AND?: component_categoryScalarWhereWithAggregatesInput | component_categoryScalarWhereWithAggregatesInput[]
    OR?: component_categoryScalarWhereWithAggregatesInput[]
    NOT?: component_categoryScalarWhereWithAggregatesInput | component_categoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"component_category"> | number
    name?: StringWithAggregatesFilter<"component_category"> | string
  }

  export type SystemConfigWhereInput = {
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    id?: IntFilter<"SystemConfig"> | number
    config_key?: StringFilter<"SystemConfig"> | string
    config_value?: StringFilter<"SystemConfig"> | string
    description?: StringNullableFilter<"SystemConfig"> | string | null
    updated_at?: DateTimeFilter<"SystemConfig"> | Date | string
  }

  export type SystemConfigOrderByWithRelationInput = {
    id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrderInput | SortOrder
    updated_at?: SortOrder
  }

  export type SystemConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    config_key?: string
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    config_value?: StringFilter<"SystemConfig"> | string
    description?: StringNullableFilter<"SystemConfig"> | string | null
    updated_at?: DateTimeFilter<"SystemConfig"> | Date | string
  }, "id" | "config_key">

  export type SystemConfigOrderByWithAggregationInput = {
    id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: SystemConfigCountOrderByAggregateInput
    _avg?: SystemConfigAvgOrderByAggregateInput
    _max?: SystemConfigMaxOrderByAggregateInput
    _min?: SystemConfigMinOrderByAggregateInput
    _sum?: SystemConfigSumOrderByAggregateInput
  }

  export type SystemConfigScalarWhereWithAggregatesInput = {
    AND?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    OR?: SystemConfigScalarWhereWithAggregatesInput[]
    NOT?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SystemConfig"> | number
    config_key?: StringWithAggregatesFilter<"SystemConfig"> | string
    config_value?: StringWithAggregatesFilter<"SystemConfig"> | string
    description?: StringNullableWithAggregatesFilter<"SystemConfig"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
  }

  export type componentsCreateInput = {
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    meals?: mealsCreateNestedOneWithoutComponentsInput
    recipe_ingredients?: recipe_ingredientsCreateNestedManyWithoutComponentsInput
    component_portions?: component_portionsCreateNestedManyWithoutComponentsInput
    category?: component_categoryCreateNestedOneWithoutComponentsInput
  }

  export type componentsUncheckedCreateInput = {
    component_id?: number
    meal_id?: number | null
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: number | null
    recipe_ingredients?: recipe_ingredientsUncheckedCreateNestedManyWithoutComponentsInput
    component_portions?: component_portionsUncheckedCreateNestedManyWithoutComponentsInput
  }

  export type componentsUpdateInput = {
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meals?: mealsUpdateOneWithoutComponentsNestedInput
    recipe_ingredients?: recipe_ingredientsUpdateManyWithoutComponentsNestedInput
    component_portions?: component_portionsUpdateManyWithoutComponentsNestedInput
    category?: component_categoryUpdateOneWithoutComponentsNestedInput
  }

  export type componentsUncheckedUpdateInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    recipe_ingredients?: recipe_ingredientsUncheckedUpdateManyWithoutComponentsNestedInput
    component_portions?: component_portionsUncheckedUpdateManyWithoutComponentsNestedInput
  }

  export type componentsCreateManyInput = {
    component_id?: number
    meal_id?: number | null
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: number | null
  }

  export type componentsUpdateManyMutationInput = {
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type componentsUncheckedUpdateManyInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type component_portionsCreateInput = {
    label: string
    total_weight_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    components: componentsCreateNestedOneWithoutComponent_portionsInput
  }

  export type component_portionsUncheckedCreateInput = {
    portion_id?: number
    component_id: number
    label: string
    total_weight_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type component_portionsUpdateInput = {
    label?: StringFieldUpdateOperationsInput | string
    total_weight_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    components?: componentsUpdateOneRequiredWithoutComponent_portionsNestedInput
  }

  export type component_portionsUncheckedUpdateInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    component_id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    total_weight_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type component_portionsCreateManyInput = {
    portion_id?: number
    component_id: number
    label: string
    total_weight_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type component_portionsUpdateManyMutationInput = {
    label?: StringFieldUpdateOperationsInput | string
    total_weight_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type component_portionsUncheckedUpdateManyInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    component_id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    total_weight_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ingredientsCreateInput = {
    ingredient_name: string
    default_unit: string
    calories_per_100g: Decimal | DecimalJsLike | number | string
    fat_g: Decimal | DecimalJsLike | number | string
    protein_g: Decimal | DecimalJsLike | number | string
    carbohydrates_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    recipe_ingredients?: recipe_ingredientsCreateNestedManyWithoutIngredientsInput
  }

  export type ingredientsUncheckedCreateInput = {
    ingredient_id?: number
    ingredient_name: string
    default_unit: string
    calories_per_100g: Decimal | DecimalJsLike | number | string
    fat_g: Decimal | DecimalJsLike | number | string
    protein_g: Decimal | DecimalJsLike | number | string
    carbohydrates_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    recipe_ingredients?: recipe_ingredientsUncheckedCreateNestedManyWithoutIngredientsInput
  }

  export type ingredientsUpdateInput = {
    ingredient_name?: StringFieldUpdateOperationsInput | string
    default_unit?: StringFieldUpdateOperationsInput | string
    calories_per_100g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipe_ingredients?: recipe_ingredientsUpdateManyWithoutIngredientsNestedInput
  }

  export type ingredientsUncheckedUpdateInput = {
    ingredient_id?: IntFieldUpdateOperationsInput | number
    ingredient_name?: StringFieldUpdateOperationsInput | string
    default_unit?: StringFieldUpdateOperationsInput | string
    calories_per_100g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipe_ingredients?: recipe_ingredientsUncheckedUpdateManyWithoutIngredientsNestedInput
  }

  export type ingredientsCreateManyInput = {
    ingredient_id?: number
    ingredient_name: string
    default_unit: string
    calories_per_100g: Decimal | DecimalJsLike | number | string
    fat_g: Decimal | DecimalJsLike | number | string
    protein_g: Decimal | DecimalJsLike | number | string
    carbohydrates_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type ingredientsUpdateManyMutationInput = {
    ingredient_name?: StringFieldUpdateOperationsInput | string
    default_unit?: StringFieldUpdateOperationsInput | string
    calories_per_100g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ingredientsUncheckedUpdateManyInput = {
    ingredient_id?: IntFieldUpdateOperationsInput | number
    ingredient_name?: StringFieldUpdateOperationsInput | string
    default_unit?: StringFieldUpdateOperationsInput | string
    calories_per_100g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type mealsCreateInput = {
    meal_name: string
    description?: string | null
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: string | null
    objective?: string | null
    item_code?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    components?: componentsCreateNestedManyWithoutMealsInput
    portion_options?: portion_optionsCreateNestedManyWithoutMealsInput
  }

  export type mealsUncheckedCreateInput = {
    meal_id?: number
    meal_name: string
    description?: string | null
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: string | null
    objective?: string | null
    item_code?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    components?: componentsUncheckedCreateNestedManyWithoutMealsInput
    portion_options?: portion_optionsUncheckedCreateNestedManyWithoutMealsInput
  }

  export type mealsUpdateInput = {
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    components?: componentsUpdateManyWithoutMealsNestedInput
    portion_options?: portion_optionsUpdateManyWithoutMealsNestedInput
  }

  export type mealsUncheckedUpdateInput = {
    meal_id?: IntFieldUpdateOperationsInput | number
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    components?: componentsUncheckedUpdateManyWithoutMealsNestedInput
    portion_options?: portion_optionsUncheckedUpdateManyWithoutMealsNestedInput
  }

  export type mealsCreateManyInput = {
    meal_id?: number
    meal_name: string
    description?: string | null
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: string | null
    objective?: string | null
    item_code?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type mealsUpdateManyMutationInput = {
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type mealsUncheckedUpdateManyInput = {
    meal_id?: IntFieldUpdateOperationsInput | number
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type portion_optionsCreateInput = {
    size_name: string
    multiplier: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    meals?: mealsCreateNestedOneWithoutPortion_optionsInput
  }

  export type portion_optionsUncheckedCreateInput = {
    portion_id?: number
    meal_id?: number | null
    size_name: string
    multiplier: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type portion_optionsUpdateInput = {
    size_name?: StringFieldUpdateOperationsInput | string
    multiplier?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meals?: mealsUpdateOneWithoutPortion_optionsNestedInput
  }

  export type portion_optionsUncheckedUpdateInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    size_name?: StringFieldUpdateOperationsInput | string
    multiplier?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type portion_optionsCreateManyInput = {
    portion_id?: number
    meal_id?: number | null
    size_name: string
    multiplier: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type portion_optionsUpdateManyMutationInput = {
    size_name?: StringFieldUpdateOperationsInput | string
    multiplier?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type portion_optionsUncheckedUpdateManyInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    size_name?: StringFieldUpdateOperationsInput | string
    multiplier?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateInput = {
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type recipe_ingredientsCreateInput = {
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    components: componentsCreateNestedOneWithoutRecipe_ingredientsInput
    ingredients: ingredientsCreateNestedOneWithoutRecipe_ingredientsInput
  }

  export type recipe_ingredientsUncheckedCreateInput = {
    component_id: number
    ingredient_id: number
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type recipe_ingredientsUpdateInput = {
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    components?: componentsUpdateOneRequiredWithoutRecipe_ingredientsNestedInput
    ingredients?: ingredientsUpdateOneRequiredWithoutRecipe_ingredientsNestedInput
  }

  export type recipe_ingredientsUncheckedUpdateInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    ingredient_id?: IntFieldUpdateOperationsInput | number
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type recipe_ingredientsCreateManyInput = {
    component_id: number
    ingredient_id: number
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type recipe_ingredientsUpdateManyMutationInput = {
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type recipe_ingredientsUncheckedUpdateManyInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    ingredient_id?: IntFieldUpdateOperationsInput | number
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type component_categoryCreateInput = {
    name: string
    components?: componentsCreateNestedManyWithoutCategoryInput
  }

  export type component_categoryUncheckedCreateInput = {
    id?: number
    name: string
    components?: componentsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type component_categoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    components?: componentsUpdateManyWithoutCategoryNestedInput
  }

  export type component_categoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    components?: componentsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type component_categoryCreateManyInput = {
    id?: number
    name: string
  }

  export type component_categoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type component_categoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SystemConfigCreateInput = {
    config_key: string
    config_value: string
    description?: string | null
    updated_at?: Date | string
  }

  export type SystemConfigUncheckedCreateInput = {
    id?: number
    config_key: string
    config_value: string
    description?: string | null
    updated_at?: Date | string
  }

  export type SystemConfigUpdateInput = {
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateManyInput = {
    id?: number
    config_key: string
    config_value: string
    description?: string | null
    updated_at?: Date | string
  }

  export type SystemConfigUpdateManyMutationInput = {
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MealsNullableScalarRelationFilter = {
    is?: mealsWhereInput | null
    isNot?: mealsWhereInput | null
  }

  export type Recipe_ingredientsListRelationFilter = {
    every?: recipe_ingredientsWhereInput
    some?: recipe_ingredientsWhereInput
    none?: recipe_ingredientsWhereInput
  }

  export type Component_portionsListRelationFilter = {
    every?: component_portionsWhereInput
    some?: component_portionsWhereInput
    none?: component_portionsWhereInput
  }

  export type Component_categoryNullableScalarRelationFilter = {
    is?: component_categoryWhereInput | null
    isNot?: component_categoryWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type recipe_ingredientsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type component_portionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type componentsCountOrderByAggregateInput = {
    component_id?: SortOrder
    meal_id?: SortOrder
    component_name?: SortOrder
    before_cook_weight_g?: SortOrder
    after_cook_weight_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category_id?: SortOrder
  }

  export type componentsAvgOrderByAggregateInput = {
    component_id?: SortOrder
    meal_id?: SortOrder
    before_cook_weight_g?: SortOrder
    after_cook_weight_g?: SortOrder
    category_id?: SortOrder
  }

  export type componentsMaxOrderByAggregateInput = {
    component_id?: SortOrder
    meal_id?: SortOrder
    component_name?: SortOrder
    before_cook_weight_g?: SortOrder
    after_cook_weight_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category_id?: SortOrder
  }

  export type componentsMinOrderByAggregateInput = {
    component_id?: SortOrder
    meal_id?: SortOrder
    component_name?: SortOrder
    before_cook_weight_g?: SortOrder
    after_cook_weight_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category_id?: SortOrder
  }

  export type componentsSumOrderByAggregateInput = {
    component_id?: SortOrder
    meal_id?: SortOrder
    before_cook_weight_g?: SortOrder
    after_cook_weight_g?: SortOrder
    category_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ComponentsScalarRelationFilter = {
    is?: componentsWhereInput
    isNot?: componentsWhereInput
  }

  export type component_portionsComponent_idLabelCompoundUniqueInput = {
    component_id: number
    label: string
  }

  export type component_portionsCountOrderByAggregateInput = {
    portion_id?: SortOrder
    component_id?: SortOrder
    label?: SortOrder
    total_weight_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type component_portionsAvgOrderByAggregateInput = {
    portion_id?: SortOrder
    component_id?: SortOrder
    total_weight_g?: SortOrder
  }

  export type component_portionsMaxOrderByAggregateInput = {
    portion_id?: SortOrder
    component_id?: SortOrder
    label?: SortOrder
    total_weight_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type component_portionsMinOrderByAggregateInput = {
    portion_id?: SortOrder
    component_id?: SortOrder
    label?: SortOrder
    total_weight_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type component_portionsSumOrderByAggregateInput = {
    portion_id?: SortOrder
    component_id?: SortOrder
    total_weight_g?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ingredientsCountOrderByAggregateInput = {
    ingredient_id?: SortOrder
    ingredient_name?: SortOrder
    default_unit?: SortOrder
    calories_per_100g?: SortOrder
    fat_g?: SortOrder
    protein_g?: SortOrder
    carbohydrates_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ingredientsAvgOrderByAggregateInput = {
    ingredient_id?: SortOrder
    calories_per_100g?: SortOrder
    fat_g?: SortOrder
    protein_g?: SortOrder
    carbohydrates_g?: SortOrder
  }

  export type ingredientsMaxOrderByAggregateInput = {
    ingredient_id?: SortOrder
    ingredient_name?: SortOrder
    default_unit?: SortOrder
    calories_per_100g?: SortOrder
    fat_g?: SortOrder
    protein_g?: SortOrder
    carbohydrates_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ingredientsMinOrderByAggregateInput = {
    ingredient_id?: SortOrder
    ingredient_name?: SortOrder
    default_unit?: SortOrder
    calories_per_100g?: SortOrder
    fat_g?: SortOrder
    protein_g?: SortOrder
    carbohydrates_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ingredientsSumOrderByAggregateInput = {
    ingredient_id?: SortOrder
    calories_per_100g?: SortOrder
    fat_g?: SortOrder
    protein_g?: SortOrder
    carbohydrates_g?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ComponentsListRelationFilter = {
    every?: componentsWhereInput
    some?: componentsWhereInput
    none?: componentsWhereInput
  }

  export type Portion_optionsListRelationFilter = {
    every?: portion_optionsWhereInput
    some?: portion_optionsWhereInput
    none?: portion_optionsWhereInput
  }

  export type componentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type portion_optionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type mealsCountOrderByAggregateInput = {
    meal_id?: SortOrder
    meal_name?: SortOrder
    description?: SortOrder
    is_balanced?: SortOrder
    is_gourmet?: SortOrder
    is_weight_loss?: SortOrder
    package?: SortOrder
    objective?: SortOrder
    item_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mealsAvgOrderByAggregateInput = {
    meal_id?: SortOrder
  }

  export type mealsMaxOrderByAggregateInput = {
    meal_id?: SortOrder
    meal_name?: SortOrder
    description?: SortOrder
    is_balanced?: SortOrder
    is_gourmet?: SortOrder
    is_weight_loss?: SortOrder
    package?: SortOrder
    objective?: SortOrder
    item_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mealsMinOrderByAggregateInput = {
    meal_id?: SortOrder
    meal_name?: SortOrder
    description?: SortOrder
    is_balanced?: SortOrder
    is_gourmet?: SortOrder
    is_weight_loss?: SortOrder
    package?: SortOrder
    objective?: SortOrder
    item_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mealsSumOrderByAggregateInput = {
    meal_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type portion_optionsMeal_idSize_nameCompoundUniqueInput = {
    meal_id: number
    size_name: string
  }

  export type portion_optionsCountOrderByAggregateInput = {
    portion_id?: SortOrder
    meal_id?: SortOrder
    size_name?: SortOrder
    multiplier?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type portion_optionsAvgOrderByAggregateInput = {
    portion_id?: SortOrder
    meal_id?: SortOrder
    multiplier?: SortOrder
  }

  export type portion_optionsMaxOrderByAggregateInput = {
    portion_id?: SortOrder
    meal_id?: SortOrder
    size_name?: SortOrder
    multiplier?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type portion_optionsMinOrderByAggregateInput = {
    portion_id?: SortOrder
    meal_id?: SortOrder
    size_name?: SortOrder
    multiplier?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type portion_optionsSumOrderByAggregateInput = {
    portion_id?: SortOrder
    meal_id?: SortOrder
    multiplier?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IngredientsScalarRelationFilter = {
    is?: ingredientsWhereInput
    isNot?: ingredientsWhereInput
  }

  export type recipe_ingredientsComponent_idIngredient_idCompoundUniqueInput = {
    component_id: number
    ingredient_id: number
  }

  export type recipe_ingredientsCountOrderByAggregateInput = {
    component_id?: SortOrder
    ingredient_id?: SortOrder
    raw_quantity_g?: SortOrder
    cooked_quantity_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type recipe_ingredientsAvgOrderByAggregateInput = {
    component_id?: SortOrder
    ingredient_id?: SortOrder
    raw_quantity_g?: SortOrder
    cooked_quantity_g?: SortOrder
  }

  export type recipe_ingredientsMaxOrderByAggregateInput = {
    component_id?: SortOrder
    ingredient_id?: SortOrder
    raw_quantity_g?: SortOrder
    cooked_quantity_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type recipe_ingredientsMinOrderByAggregateInput = {
    component_id?: SortOrder
    ingredient_id?: SortOrder
    raw_quantity_g?: SortOrder
    cooked_quantity_g?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type recipe_ingredientsSumOrderByAggregateInput = {
    component_id?: SortOrder
    ingredient_id?: SortOrder
    raw_quantity_g?: SortOrder
    cooked_quantity_g?: SortOrder
  }

  export type component_categoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type component_categoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type component_categoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type component_categoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type component_categorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SystemConfigCountOrderByAggregateInput = {
    id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type SystemConfigAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SystemConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type SystemConfigMinOrderByAggregateInput = {
    id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type SystemConfigSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type mealsCreateNestedOneWithoutComponentsInput = {
    create?: XOR<mealsCreateWithoutComponentsInput, mealsUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: mealsCreateOrConnectWithoutComponentsInput
    connect?: mealsWhereUniqueInput
  }

  export type recipe_ingredientsCreateNestedManyWithoutComponentsInput = {
    create?: XOR<recipe_ingredientsCreateWithoutComponentsInput, recipe_ingredientsUncheckedCreateWithoutComponentsInput> | recipe_ingredientsCreateWithoutComponentsInput[] | recipe_ingredientsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutComponentsInput | recipe_ingredientsCreateOrConnectWithoutComponentsInput[]
    createMany?: recipe_ingredientsCreateManyComponentsInputEnvelope
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
  }

  export type component_portionsCreateNestedManyWithoutComponentsInput = {
    create?: XOR<component_portionsCreateWithoutComponentsInput, component_portionsUncheckedCreateWithoutComponentsInput> | component_portionsCreateWithoutComponentsInput[] | component_portionsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: component_portionsCreateOrConnectWithoutComponentsInput | component_portionsCreateOrConnectWithoutComponentsInput[]
    createMany?: component_portionsCreateManyComponentsInputEnvelope
    connect?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
  }

  export type component_categoryCreateNestedOneWithoutComponentsInput = {
    create?: XOR<component_categoryCreateWithoutComponentsInput, component_categoryUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: component_categoryCreateOrConnectWithoutComponentsInput
    connect?: component_categoryWhereUniqueInput
  }

  export type recipe_ingredientsUncheckedCreateNestedManyWithoutComponentsInput = {
    create?: XOR<recipe_ingredientsCreateWithoutComponentsInput, recipe_ingredientsUncheckedCreateWithoutComponentsInput> | recipe_ingredientsCreateWithoutComponentsInput[] | recipe_ingredientsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutComponentsInput | recipe_ingredientsCreateOrConnectWithoutComponentsInput[]
    createMany?: recipe_ingredientsCreateManyComponentsInputEnvelope
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
  }

  export type component_portionsUncheckedCreateNestedManyWithoutComponentsInput = {
    create?: XOR<component_portionsCreateWithoutComponentsInput, component_portionsUncheckedCreateWithoutComponentsInput> | component_portionsCreateWithoutComponentsInput[] | component_portionsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: component_portionsCreateOrConnectWithoutComponentsInput | component_portionsCreateOrConnectWithoutComponentsInput[]
    createMany?: component_portionsCreateManyComponentsInputEnvelope
    connect?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type mealsUpdateOneWithoutComponentsNestedInput = {
    create?: XOR<mealsCreateWithoutComponentsInput, mealsUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: mealsCreateOrConnectWithoutComponentsInput
    upsert?: mealsUpsertWithoutComponentsInput
    disconnect?: mealsWhereInput | boolean
    delete?: mealsWhereInput | boolean
    connect?: mealsWhereUniqueInput
    update?: XOR<XOR<mealsUpdateToOneWithWhereWithoutComponentsInput, mealsUpdateWithoutComponentsInput>, mealsUncheckedUpdateWithoutComponentsInput>
  }

  export type recipe_ingredientsUpdateManyWithoutComponentsNestedInput = {
    create?: XOR<recipe_ingredientsCreateWithoutComponentsInput, recipe_ingredientsUncheckedCreateWithoutComponentsInput> | recipe_ingredientsCreateWithoutComponentsInput[] | recipe_ingredientsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutComponentsInput | recipe_ingredientsCreateOrConnectWithoutComponentsInput[]
    upsert?: recipe_ingredientsUpsertWithWhereUniqueWithoutComponentsInput | recipe_ingredientsUpsertWithWhereUniqueWithoutComponentsInput[]
    createMany?: recipe_ingredientsCreateManyComponentsInputEnvelope
    set?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    disconnect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    delete?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    update?: recipe_ingredientsUpdateWithWhereUniqueWithoutComponentsInput | recipe_ingredientsUpdateWithWhereUniqueWithoutComponentsInput[]
    updateMany?: recipe_ingredientsUpdateManyWithWhereWithoutComponentsInput | recipe_ingredientsUpdateManyWithWhereWithoutComponentsInput[]
    deleteMany?: recipe_ingredientsScalarWhereInput | recipe_ingredientsScalarWhereInput[]
  }

  export type component_portionsUpdateManyWithoutComponentsNestedInput = {
    create?: XOR<component_portionsCreateWithoutComponentsInput, component_portionsUncheckedCreateWithoutComponentsInput> | component_portionsCreateWithoutComponentsInput[] | component_portionsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: component_portionsCreateOrConnectWithoutComponentsInput | component_portionsCreateOrConnectWithoutComponentsInput[]
    upsert?: component_portionsUpsertWithWhereUniqueWithoutComponentsInput | component_portionsUpsertWithWhereUniqueWithoutComponentsInput[]
    createMany?: component_portionsCreateManyComponentsInputEnvelope
    set?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    disconnect?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    delete?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    connect?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    update?: component_portionsUpdateWithWhereUniqueWithoutComponentsInput | component_portionsUpdateWithWhereUniqueWithoutComponentsInput[]
    updateMany?: component_portionsUpdateManyWithWhereWithoutComponentsInput | component_portionsUpdateManyWithWhereWithoutComponentsInput[]
    deleteMany?: component_portionsScalarWhereInput | component_portionsScalarWhereInput[]
  }

  export type component_categoryUpdateOneWithoutComponentsNestedInput = {
    create?: XOR<component_categoryCreateWithoutComponentsInput, component_categoryUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: component_categoryCreateOrConnectWithoutComponentsInput
    upsert?: component_categoryUpsertWithoutComponentsInput
    disconnect?: component_categoryWhereInput | boolean
    delete?: component_categoryWhereInput | boolean
    connect?: component_categoryWhereUniqueInput
    update?: XOR<XOR<component_categoryUpdateToOneWithWhereWithoutComponentsInput, component_categoryUpdateWithoutComponentsInput>, component_categoryUncheckedUpdateWithoutComponentsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type recipe_ingredientsUncheckedUpdateManyWithoutComponentsNestedInput = {
    create?: XOR<recipe_ingredientsCreateWithoutComponentsInput, recipe_ingredientsUncheckedCreateWithoutComponentsInput> | recipe_ingredientsCreateWithoutComponentsInput[] | recipe_ingredientsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutComponentsInput | recipe_ingredientsCreateOrConnectWithoutComponentsInput[]
    upsert?: recipe_ingredientsUpsertWithWhereUniqueWithoutComponentsInput | recipe_ingredientsUpsertWithWhereUniqueWithoutComponentsInput[]
    createMany?: recipe_ingredientsCreateManyComponentsInputEnvelope
    set?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    disconnect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    delete?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    update?: recipe_ingredientsUpdateWithWhereUniqueWithoutComponentsInput | recipe_ingredientsUpdateWithWhereUniqueWithoutComponentsInput[]
    updateMany?: recipe_ingredientsUpdateManyWithWhereWithoutComponentsInput | recipe_ingredientsUpdateManyWithWhereWithoutComponentsInput[]
    deleteMany?: recipe_ingredientsScalarWhereInput | recipe_ingredientsScalarWhereInput[]
  }

  export type component_portionsUncheckedUpdateManyWithoutComponentsNestedInput = {
    create?: XOR<component_portionsCreateWithoutComponentsInput, component_portionsUncheckedCreateWithoutComponentsInput> | component_portionsCreateWithoutComponentsInput[] | component_portionsUncheckedCreateWithoutComponentsInput[]
    connectOrCreate?: component_portionsCreateOrConnectWithoutComponentsInput | component_portionsCreateOrConnectWithoutComponentsInput[]
    upsert?: component_portionsUpsertWithWhereUniqueWithoutComponentsInput | component_portionsUpsertWithWhereUniqueWithoutComponentsInput[]
    createMany?: component_portionsCreateManyComponentsInputEnvelope
    set?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    disconnect?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    delete?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    connect?: component_portionsWhereUniqueInput | component_portionsWhereUniqueInput[]
    update?: component_portionsUpdateWithWhereUniqueWithoutComponentsInput | component_portionsUpdateWithWhereUniqueWithoutComponentsInput[]
    updateMany?: component_portionsUpdateManyWithWhereWithoutComponentsInput | component_portionsUpdateManyWithWhereWithoutComponentsInput[]
    deleteMany?: component_portionsScalarWhereInput | component_portionsScalarWhereInput[]
  }

  export type componentsCreateNestedOneWithoutComponent_portionsInput = {
    create?: XOR<componentsCreateWithoutComponent_portionsInput, componentsUncheckedCreateWithoutComponent_portionsInput>
    connectOrCreate?: componentsCreateOrConnectWithoutComponent_portionsInput
    connect?: componentsWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type componentsUpdateOneRequiredWithoutComponent_portionsNestedInput = {
    create?: XOR<componentsCreateWithoutComponent_portionsInput, componentsUncheckedCreateWithoutComponent_portionsInput>
    connectOrCreate?: componentsCreateOrConnectWithoutComponent_portionsInput
    upsert?: componentsUpsertWithoutComponent_portionsInput
    connect?: componentsWhereUniqueInput
    update?: XOR<XOR<componentsUpdateToOneWithWhereWithoutComponent_portionsInput, componentsUpdateWithoutComponent_portionsInput>, componentsUncheckedUpdateWithoutComponent_portionsInput>
  }

  export type recipe_ingredientsCreateNestedManyWithoutIngredientsInput = {
    create?: XOR<recipe_ingredientsCreateWithoutIngredientsInput, recipe_ingredientsUncheckedCreateWithoutIngredientsInput> | recipe_ingredientsCreateWithoutIngredientsInput[] | recipe_ingredientsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutIngredientsInput | recipe_ingredientsCreateOrConnectWithoutIngredientsInput[]
    createMany?: recipe_ingredientsCreateManyIngredientsInputEnvelope
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
  }

  export type recipe_ingredientsUncheckedCreateNestedManyWithoutIngredientsInput = {
    create?: XOR<recipe_ingredientsCreateWithoutIngredientsInput, recipe_ingredientsUncheckedCreateWithoutIngredientsInput> | recipe_ingredientsCreateWithoutIngredientsInput[] | recipe_ingredientsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutIngredientsInput | recipe_ingredientsCreateOrConnectWithoutIngredientsInput[]
    createMany?: recipe_ingredientsCreateManyIngredientsInputEnvelope
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
  }

  export type recipe_ingredientsUpdateManyWithoutIngredientsNestedInput = {
    create?: XOR<recipe_ingredientsCreateWithoutIngredientsInput, recipe_ingredientsUncheckedCreateWithoutIngredientsInput> | recipe_ingredientsCreateWithoutIngredientsInput[] | recipe_ingredientsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutIngredientsInput | recipe_ingredientsCreateOrConnectWithoutIngredientsInput[]
    upsert?: recipe_ingredientsUpsertWithWhereUniqueWithoutIngredientsInput | recipe_ingredientsUpsertWithWhereUniqueWithoutIngredientsInput[]
    createMany?: recipe_ingredientsCreateManyIngredientsInputEnvelope
    set?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    disconnect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    delete?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    update?: recipe_ingredientsUpdateWithWhereUniqueWithoutIngredientsInput | recipe_ingredientsUpdateWithWhereUniqueWithoutIngredientsInput[]
    updateMany?: recipe_ingredientsUpdateManyWithWhereWithoutIngredientsInput | recipe_ingredientsUpdateManyWithWhereWithoutIngredientsInput[]
    deleteMany?: recipe_ingredientsScalarWhereInput | recipe_ingredientsScalarWhereInput[]
  }

  export type recipe_ingredientsUncheckedUpdateManyWithoutIngredientsNestedInput = {
    create?: XOR<recipe_ingredientsCreateWithoutIngredientsInput, recipe_ingredientsUncheckedCreateWithoutIngredientsInput> | recipe_ingredientsCreateWithoutIngredientsInput[] | recipe_ingredientsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: recipe_ingredientsCreateOrConnectWithoutIngredientsInput | recipe_ingredientsCreateOrConnectWithoutIngredientsInput[]
    upsert?: recipe_ingredientsUpsertWithWhereUniqueWithoutIngredientsInput | recipe_ingredientsUpsertWithWhereUniqueWithoutIngredientsInput[]
    createMany?: recipe_ingredientsCreateManyIngredientsInputEnvelope
    set?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    disconnect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    delete?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    connect?: recipe_ingredientsWhereUniqueInput | recipe_ingredientsWhereUniqueInput[]
    update?: recipe_ingredientsUpdateWithWhereUniqueWithoutIngredientsInput | recipe_ingredientsUpdateWithWhereUniqueWithoutIngredientsInput[]
    updateMany?: recipe_ingredientsUpdateManyWithWhereWithoutIngredientsInput | recipe_ingredientsUpdateManyWithWhereWithoutIngredientsInput[]
    deleteMany?: recipe_ingredientsScalarWhereInput | recipe_ingredientsScalarWhereInput[]
  }

  export type componentsCreateNestedManyWithoutMealsInput = {
    create?: XOR<componentsCreateWithoutMealsInput, componentsUncheckedCreateWithoutMealsInput> | componentsCreateWithoutMealsInput[] | componentsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutMealsInput | componentsCreateOrConnectWithoutMealsInput[]
    createMany?: componentsCreateManyMealsInputEnvelope
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
  }

  export type portion_optionsCreateNestedManyWithoutMealsInput = {
    create?: XOR<portion_optionsCreateWithoutMealsInput, portion_optionsUncheckedCreateWithoutMealsInput> | portion_optionsCreateWithoutMealsInput[] | portion_optionsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: portion_optionsCreateOrConnectWithoutMealsInput | portion_optionsCreateOrConnectWithoutMealsInput[]
    createMany?: portion_optionsCreateManyMealsInputEnvelope
    connect?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
  }

  export type componentsUncheckedCreateNestedManyWithoutMealsInput = {
    create?: XOR<componentsCreateWithoutMealsInput, componentsUncheckedCreateWithoutMealsInput> | componentsCreateWithoutMealsInput[] | componentsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutMealsInput | componentsCreateOrConnectWithoutMealsInput[]
    createMany?: componentsCreateManyMealsInputEnvelope
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
  }

  export type portion_optionsUncheckedCreateNestedManyWithoutMealsInput = {
    create?: XOR<portion_optionsCreateWithoutMealsInput, portion_optionsUncheckedCreateWithoutMealsInput> | portion_optionsCreateWithoutMealsInput[] | portion_optionsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: portion_optionsCreateOrConnectWithoutMealsInput | portion_optionsCreateOrConnectWithoutMealsInput[]
    createMany?: portion_optionsCreateManyMealsInputEnvelope
    connect?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type componentsUpdateManyWithoutMealsNestedInput = {
    create?: XOR<componentsCreateWithoutMealsInput, componentsUncheckedCreateWithoutMealsInput> | componentsCreateWithoutMealsInput[] | componentsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutMealsInput | componentsCreateOrConnectWithoutMealsInput[]
    upsert?: componentsUpsertWithWhereUniqueWithoutMealsInput | componentsUpsertWithWhereUniqueWithoutMealsInput[]
    createMany?: componentsCreateManyMealsInputEnvelope
    set?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    disconnect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    delete?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    update?: componentsUpdateWithWhereUniqueWithoutMealsInput | componentsUpdateWithWhereUniqueWithoutMealsInput[]
    updateMany?: componentsUpdateManyWithWhereWithoutMealsInput | componentsUpdateManyWithWhereWithoutMealsInput[]
    deleteMany?: componentsScalarWhereInput | componentsScalarWhereInput[]
  }

  export type portion_optionsUpdateManyWithoutMealsNestedInput = {
    create?: XOR<portion_optionsCreateWithoutMealsInput, portion_optionsUncheckedCreateWithoutMealsInput> | portion_optionsCreateWithoutMealsInput[] | portion_optionsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: portion_optionsCreateOrConnectWithoutMealsInput | portion_optionsCreateOrConnectWithoutMealsInput[]
    upsert?: portion_optionsUpsertWithWhereUniqueWithoutMealsInput | portion_optionsUpsertWithWhereUniqueWithoutMealsInput[]
    createMany?: portion_optionsCreateManyMealsInputEnvelope
    set?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    disconnect?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    delete?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    connect?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    update?: portion_optionsUpdateWithWhereUniqueWithoutMealsInput | portion_optionsUpdateWithWhereUniqueWithoutMealsInput[]
    updateMany?: portion_optionsUpdateManyWithWhereWithoutMealsInput | portion_optionsUpdateManyWithWhereWithoutMealsInput[]
    deleteMany?: portion_optionsScalarWhereInput | portion_optionsScalarWhereInput[]
  }

  export type componentsUncheckedUpdateManyWithoutMealsNestedInput = {
    create?: XOR<componentsCreateWithoutMealsInput, componentsUncheckedCreateWithoutMealsInput> | componentsCreateWithoutMealsInput[] | componentsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutMealsInput | componentsCreateOrConnectWithoutMealsInput[]
    upsert?: componentsUpsertWithWhereUniqueWithoutMealsInput | componentsUpsertWithWhereUniqueWithoutMealsInput[]
    createMany?: componentsCreateManyMealsInputEnvelope
    set?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    disconnect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    delete?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    update?: componentsUpdateWithWhereUniqueWithoutMealsInput | componentsUpdateWithWhereUniqueWithoutMealsInput[]
    updateMany?: componentsUpdateManyWithWhereWithoutMealsInput | componentsUpdateManyWithWhereWithoutMealsInput[]
    deleteMany?: componentsScalarWhereInput | componentsScalarWhereInput[]
  }

  export type portion_optionsUncheckedUpdateManyWithoutMealsNestedInput = {
    create?: XOR<portion_optionsCreateWithoutMealsInput, portion_optionsUncheckedCreateWithoutMealsInput> | portion_optionsCreateWithoutMealsInput[] | portion_optionsUncheckedCreateWithoutMealsInput[]
    connectOrCreate?: portion_optionsCreateOrConnectWithoutMealsInput | portion_optionsCreateOrConnectWithoutMealsInput[]
    upsert?: portion_optionsUpsertWithWhereUniqueWithoutMealsInput | portion_optionsUpsertWithWhereUniqueWithoutMealsInput[]
    createMany?: portion_optionsCreateManyMealsInputEnvelope
    set?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    disconnect?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    delete?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    connect?: portion_optionsWhereUniqueInput | portion_optionsWhereUniqueInput[]
    update?: portion_optionsUpdateWithWhereUniqueWithoutMealsInput | portion_optionsUpdateWithWhereUniqueWithoutMealsInput[]
    updateMany?: portion_optionsUpdateManyWithWhereWithoutMealsInput | portion_optionsUpdateManyWithWhereWithoutMealsInput[]
    deleteMany?: portion_optionsScalarWhereInput | portion_optionsScalarWhereInput[]
  }

  export type mealsCreateNestedOneWithoutPortion_optionsInput = {
    create?: XOR<mealsCreateWithoutPortion_optionsInput, mealsUncheckedCreateWithoutPortion_optionsInput>
    connectOrCreate?: mealsCreateOrConnectWithoutPortion_optionsInput
    connect?: mealsWhereUniqueInput
  }

  export type mealsUpdateOneWithoutPortion_optionsNestedInput = {
    create?: XOR<mealsCreateWithoutPortion_optionsInput, mealsUncheckedCreateWithoutPortion_optionsInput>
    connectOrCreate?: mealsCreateOrConnectWithoutPortion_optionsInput
    upsert?: mealsUpsertWithoutPortion_optionsInput
    disconnect?: mealsWhereInput | boolean
    delete?: mealsWhereInput | boolean
    connect?: mealsWhereUniqueInput
    update?: XOR<XOR<mealsUpdateToOneWithWhereWithoutPortion_optionsInput, mealsUpdateWithoutPortion_optionsInput>, mealsUncheckedUpdateWithoutPortion_optionsInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type componentsCreateNestedOneWithoutRecipe_ingredientsInput = {
    create?: XOR<componentsCreateWithoutRecipe_ingredientsInput, componentsUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: componentsCreateOrConnectWithoutRecipe_ingredientsInput
    connect?: componentsWhereUniqueInput
  }

  export type ingredientsCreateNestedOneWithoutRecipe_ingredientsInput = {
    create?: XOR<ingredientsCreateWithoutRecipe_ingredientsInput, ingredientsUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: ingredientsCreateOrConnectWithoutRecipe_ingredientsInput
    connect?: ingredientsWhereUniqueInput
  }

  export type componentsUpdateOneRequiredWithoutRecipe_ingredientsNestedInput = {
    create?: XOR<componentsCreateWithoutRecipe_ingredientsInput, componentsUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: componentsCreateOrConnectWithoutRecipe_ingredientsInput
    upsert?: componentsUpsertWithoutRecipe_ingredientsInput
    connect?: componentsWhereUniqueInput
    update?: XOR<XOR<componentsUpdateToOneWithWhereWithoutRecipe_ingredientsInput, componentsUpdateWithoutRecipe_ingredientsInput>, componentsUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type ingredientsUpdateOneRequiredWithoutRecipe_ingredientsNestedInput = {
    create?: XOR<ingredientsCreateWithoutRecipe_ingredientsInput, ingredientsUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: ingredientsCreateOrConnectWithoutRecipe_ingredientsInput
    upsert?: ingredientsUpsertWithoutRecipe_ingredientsInput
    connect?: ingredientsWhereUniqueInput
    update?: XOR<XOR<ingredientsUpdateToOneWithWhereWithoutRecipe_ingredientsInput, ingredientsUpdateWithoutRecipe_ingredientsInput>, ingredientsUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type componentsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<componentsCreateWithoutCategoryInput, componentsUncheckedCreateWithoutCategoryInput> | componentsCreateWithoutCategoryInput[] | componentsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutCategoryInput | componentsCreateOrConnectWithoutCategoryInput[]
    createMany?: componentsCreateManyCategoryInputEnvelope
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
  }

  export type componentsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<componentsCreateWithoutCategoryInput, componentsUncheckedCreateWithoutCategoryInput> | componentsCreateWithoutCategoryInput[] | componentsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutCategoryInput | componentsCreateOrConnectWithoutCategoryInput[]
    createMany?: componentsCreateManyCategoryInputEnvelope
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
  }

  export type componentsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<componentsCreateWithoutCategoryInput, componentsUncheckedCreateWithoutCategoryInput> | componentsCreateWithoutCategoryInput[] | componentsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutCategoryInput | componentsCreateOrConnectWithoutCategoryInput[]
    upsert?: componentsUpsertWithWhereUniqueWithoutCategoryInput | componentsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: componentsCreateManyCategoryInputEnvelope
    set?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    disconnect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    delete?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    update?: componentsUpdateWithWhereUniqueWithoutCategoryInput | componentsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: componentsUpdateManyWithWhereWithoutCategoryInput | componentsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: componentsScalarWhereInput | componentsScalarWhereInput[]
  }

  export type componentsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<componentsCreateWithoutCategoryInput, componentsUncheckedCreateWithoutCategoryInput> | componentsCreateWithoutCategoryInput[] | componentsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: componentsCreateOrConnectWithoutCategoryInput | componentsCreateOrConnectWithoutCategoryInput[]
    upsert?: componentsUpsertWithWhereUniqueWithoutCategoryInput | componentsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: componentsCreateManyCategoryInputEnvelope
    set?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    disconnect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    delete?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    connect?: componentsWhereUniqueInput | componentsWhereUniqueInput[]
    update?: componentsUpdateWithWhereUniqueWithoutCategoryInput | componentsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: componentsUpdateManyWithWhereWithoutCategoryInput | componentsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: componentsScalarWhereInput | componentsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type mealsCreateWithoutComponentsInput = {
    meal_name: string
    description?: string | null
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: string | null
    objective?: string | null
    item_code?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    portion_options?: portion_optionsCreateNestedManyWithoutMealsInput
  }

  export type mealsUncheckedCreateWithoutComponentsInput = {
    meal_id?: number
    meal_name: string
    description?: string | null
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: string | null
    objective?: string | null
    item_code?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    portion_options?: portion_optionsUncheckedCreateNestedManyWithoutMealsInput
  }

  export type mealsCreateOrConnectWithoutComponentsInput = {
    where: mealsWhereUniqueInput
    create: XOR<mealsCreateWithoutComponentsInput, mealsUncheckedCreateWithoutComponentsInput>
  }

  export type recipe_ingredientsCreateWithoutComponentsInput = {
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    ingredients: ingredientsCreateNestedOneWithoutRecipe_ingredientsInput
  }

  export type recipe_ingredientsUncheckedCreateWithoutComponentsInput = {
    ingredient_id: number
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type recipe_ingredientsCreateOrConnectWithoutComponentsInput = {
    where: recipe_ingredientsWhereUniqueInput
    create: XOR<recipe_ingredientsCreateWithoutComponentsInput, recipe_ingredientsUncheckedCreateWithoutComponentsInput>
  }

  export type recipe_ingredientsCreateManyComponentsInputEnvelope = {
    data: recipe_ingredientsCreateManyComponentsInput | recipe_ingredientsCreateManyComponentsInput[]
    skipDuplicates?: boolean
  }

  export type component_portionsCreateWithoutComponentsInput = {
    label: string
    total_weight_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type component_portionsUncheckedCreateWithoutComponentsInput = {
    portion_id?: number
    label: string
    total_weight_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type component_portionsCreateOrConnectWithoutComponentsInput = {
    where: component_portionsWhereUniqueInput
    create: XOR<component_portionsCreateWithoutComponentsInput, component_portionsUncheckedCreateWithoutComponentsInput>
  }

  export type component_portionsCreateManyComponentsInputEnvelope = {
    data: component_portionsCreateManyComponentsInput | component_portionsCreateManyComponentsInput[]
    skipDuplicates?: boolean
  }

  export type component_categoryCreateWithoutComponentsInput = {
    name: string
  }

  export type component_categoryUncheckedCreateWithoutComponentsInput = {
    id?: number
    name: string
  }

  export type component_categoryCreateOrConnectWithoutComponentsInput = {
    where: component_categoryWhereUniqueInput
    create: XOR<component_categoryCreateWithoutComponentsInput, component_categoryUncheckedCreateWithoutComponentsInput>
  }

  export type mealsUpsertWithoutComponentsInput = {
    update: XOR<mealsUpdateWithoutComponentsInput, mealsUncheckedUpdateWithoutComponentsInput>
    create: XOR<mealsCreateWithoutComponentsInput, mealsUncheckedCreateWithoutComponentsInput>
    where?: mealsWhereInput
  }

  export type mealsUpdateToOneWithWhereWithoutComponentsInput = {
    where?: mealsWhereInput
    data: XOR<mealsUpdateWithoutComponentsInput, mealsUncheckedUpdateWithoutComponentsInput>
  }

  export type mealsUpdateWithoutComponentsInput = {
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portion_options?: portion_optionsUpdateManyWithoutMealsNestedInput
  }

  export type mealsUncheckedUpdateWithoutComponentsInput = {
    meal_id?: IntFieldUpdateOperationsInput | number
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portion_options?: portion_optionsUncheckedUpdateManyWithoutMealsNestedInput
  }

  export type recipe_ingredientsUpsertWithWhereUniqueWithoutComponentsInput = {
    where: recipe_ingredientsWhereUniqueInput
    update: XOR<recipe_ingredientsUpdateWithoutComponentsInput, recipe_ingredientsUncheckedUpdateWithoutComponentsInput>
    create: XOR<recipe_ingredientsCreateWithoutComponentsInput, recipe_ingredientsUncheckedCreateWithoutComponentsInput>
  }

  export type recipe_ingredientsUpdateWithWhereUniqueWithoutComponentsInput = {
    where: recipe_ingredientsWhereUniqueInput
    data: XOR<recipe_ingredientsUpdateWithoutComponentsInput, recipe_ingredientsUncheckedUpdateWithoutComponentsInput>
  }

  export type recipe_ingredientsUpdateManyWithWhereWithoutComponentsInput = {
    where: recipe_ingredientsScalarWhereInput
    data: XOR<recipe_ingredientsUpdateManyMutationInput, recipe_ingredientsUncheckedUpdateManyWithoutComponentsInput>
  }

  export type recipe_ingredientsScalarWhereInput = {
    AND?: recipe_ingredientsScalarWhereInput | recipe_ingredientsScalarWhereInput[]
    OR?: recipe_ingredientsScalarWhereInput[]
    NOT?: recipe_ingredientsScalarWhereInput | recipe_ingredientsScalarWhereInput[]
    component_id?: IntFilter<"recipe_ingredients"> | number
    ingredient_id?: IntFilter<"recipe_ingredients"> | number
    raw_quantity_g?: DecimalFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: DecimalNullableFilter<"recipe_ingredients"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"recipe_ingredients"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"recipe_ingredients"> | Date | string | null
  }

  export type component_portionsUpsertWithWhereUniqueWithoutComponentsInput = {
    where: component_portionsWhereUniqueInput
    update: XOR<component_portionsUpdateWithoutComponentsInput, component_portionsUncheckedUpdateWithoutComponentsInput>
    create: XOR<component_portionsCreateWithoutComponentsInput, component_portionsUncheckedCreateWithoutComponentsInput>
  }

  export type component_portionsUpdateWithWhereUniqueWithoutComponentsInput = {
    where: component_portionsWhereUniqueInput
    data: XOR<component_portionsUpdateWithoutComponentsInput, component_portionsUncheckedUpdateWithoutComponentsInput>
  }

  export type component_portionsUpdateManyWithWhereWithoutComponentsInput = {
    where: component_portionsScalarWhereInput
    data: XOR<component_portionsUpdateManyMutationInput, component_portionsUncheckedUpdateManyWithoutComponentsInput>
  }

  export type component_portionsScalarWhereInput = {
    AND?: component_portionsScalarWhereInput | component_portionsScalarWhereInput[]
    OR?: component_portionsScalarWhereInput[]
    NOT?: component_portionsScalarWhereInput | component_portionsScalarWhereInput[]
    portion_id?: IntFilter<"component_portions"> | number
    component_id?: IntFilter<"component_portions"> | number
    label?: StringFilter<"component_portions"> | string
    total_weight_g?: DecimalFilter<"component_portions"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"component_portions"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"component_portions"> | Date | string | null
  }

  export type component_categoryUpsertWithoutComponentsInput = {
    update: XOR<component_categoryUpdateWithoutComponentsInput, component_categoryUncheckedUpdateWithoutComponentsInput>
    create: XOR<component_categoryCreateWithoutComponentsInput, component_categoryUncheckedCreateWithoutComponentsInput>
    where?: component_categoryWhereInput
  }

  export type component_categoryUpdateToOneWithWhereWithoutComponentsInput = {
    where?: component_categoryWhereInput
    data: XOR<component_categoryUpdateWithoutComponentsInput, component_categoryUncheckedUpdateWithoutComponentsInput>
  }

  export type component_categoryUpdateWithoutComponentsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type component_categoryUncheckedUpdateWithoutComponentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type componentsCreateWithoutComponent_portionsInput = {
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    meals?: mealsCreateNestedOneWithoutComponentsInput
    recipe_ingredients?: recipe_ingredientsCreateNestedManyWithoutComponentsInput
    category?: component_categoryCreateNestedOneWithoutComponentsInput
  }

  export type componentsUncheckedCreateWithoutComponent_portionsInput = {
    component_id?: number
    meal_id?: number | null
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: number | null
    recipe_ingredients?: recipe_ingredientsUncheckedCreateNestedManyWithoutComponentsInput
  }

  export type componentsCreateOrConnectWithoutComponent_portionsInput = {
    where: componentsWhereUniqueInput
    create: XOR<componentsCreateWithoutComponent_portionsInput, componentsUncheckedCreateWithoutComponent_portionsInput>
  }

  export type componentsUpsertWithoutComponent_portionsInput = {
    update: XOR<componentsUpdateWithoutComponent_portionsInput, componentsUncheckedUpdateWithoutComponent_portionsInput>
    create: XOR<componentsCreateWithoutComponent_portionsInput, componentsUncheckedCreateWithoutComponent_portionsInput>
    where?: componentsWhereInput
  }

  export type componentsUpdateToOneWithWhereWithoutComponent_portionsInput = {
    where?: componentsWhereInput
    data: XOR<componentsUpdateWithoutComponent_portionsInput, componentsUncheckedUpdateWithoutComponent_portionsInput>
  }

  export type componentsUpdateWithoutComponent_portionsInput = {
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meals?: mealsUpdateOneWithoutComponentsNestedInput
    recipe_ingredients?: recipe_ingredientsUpdateManyWithoutComponentsNestedInput
    category?: component_categoryUpdateOneWithoutComponentsNestedInput
  }

  export type componentsUncheckedUpdateWithoutComponent_portionsInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    recipe_ingredients?: recipe_ingredientsUncheckedUpdateManyWithoutComponentsNestedInput
  }

  export type recipe_ingredientsCreateWithoutIngredientsInput = {
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    components: componentsCreateNestedOneWithoutRecipe_ingredientsInput
  }

  export type recipe_ingredientsUncheckedCreateWithoutIngredientsInput = {
    component_id: number
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type recipe_ingredientsCreateOrConnectWithoutIngredientsInput = {
    where: recipe_ingredientsWhereUniqueInput
    create: XOR<recipe_ingredientsCreateWithoutIngredientsInput, recipe_ingredientsUncheckedCreateWithoutIngredientsInput>
  }

  export type recipe_ingredientsCreateManyIngredientsInputEnvelope = {
    data: recipe_ingredientsCreateManyIngredientsInput | recipe_ingredientsCreateManyIngredientsInput[]
    skipDuplicates?: boolean
  }

  export type recipe_ingredientsUpsertWithWhereUniqueWithoutIngredientsInput = {
    where: recipe_ingredientsWhereUniqueInput
    update: XOR<recipe_ingredientsUpdateWithoutIngredientsInput, recipe_ingredientsUncheckedUpdateWithoutIngredientsInput>
    create: XOR<recipe_ingredientsCreateWithoutIngredientsInput, recipe_ingredientsUncheckedCreateWithoutIngredientsInput>
  }

  export type recipe_ingredientsUpdateWithWhereUniqueWithoutIngredientsInput = {
    where: recipe_ingredientsWhereUniqueInput
    data: XOR<recipe_ingredientsUpdateWithoutIngredientsInput, recipe_ingredientsUncheckedUpdateWithoutIngredientsInput>
  }

  export type recipe_ingredientsUpdateManyWithWhereWithoutIngredientsInput = {
    where: recipe_ingredientsScalarWhereInput
    data: XOR<recipe_ingredientsUpdateManyMutationInput, recipe_ingredientsUncheckedUpdateManyWithoutIngredientsInput>
  }

  export type componentsCreateWithoutMealsInput = {
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    recipe_ingredients?: recipe_ingredientsCreateNestedManyWithoutComponentsInput
    component_portions?: component_portionsCreateNestedManyWithoutComponentsInput
    category?: component_categoryCreateNestedOneWithoutComponentsInput
  }

  export type componentsUncheckedCreateWithoutMealsInput = {
    component_id?: number
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: number | null
    recipe_ingredients?: recipe_ingredientsUncheckedCreateNestedManyWithoutComponentsInput
    component_portions?: component_portionsUncheckedCreateNestedManyWithoutComponentsInput
  }

  export type componentsCreateOrConnectWithoutMealsInput = {
    where: componentsWhereUniqueInput
    create: XOR<componentsCreateWithoutMealsInput, componentsUncheckedCreateWithoutMealsInput>
  }

  export type componentsCreateManyMealsInputEnvelope = {
    data: componentsCreateManyMealsInput | componentsCreateManyMealsInput[]
    skipDuplicates?: boolean
  }

  export type portion_optionsCreateWithoutMealsInput = {
    size_name: string
    multiplier: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type portion_optionsUncheckedCreateWithoutMealsInput = {
    portion_id?: number
    size_name: string
    multiplier: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type portion_optionsCreateOrConnectWithoutMealsInput = {
    where: portion_optionsWhereUniqueInput
    create: XOR<portion_optionsCreateWithoutMealsInput, portion_optionsUncheckedCreateWithoutMealsInput>
  }

  export type portion_optionsCreateManyMealsInputEnvelope = {
    data: portion_optionsCreateManyMealsInput | portion_optionsCreateManyMealsInput[]
    skipDuplicates?: boolean
  }

  export type componentsUpsertWithWhereUniqueWithoutMealsInput = {
    where: componentsWhereUniqueInput
    update: XOR<componentsUpdateWithoutMealsInput, componentsUncheckedUpdateWithoutMealsInput>
    create: XOR<componentsCreateWithoutMealsInput, componentsUncheckedCreateWithoutMealsInput>
  }

  export type componentsUpdateWithWhereUniqueWithoutMealsInput = {
    where: componentsWhereUniqueInput
    data: XOR<componentsUpdateWithoutMealsInput, componentsUncheckedUpdateWithoutMealsInput>
  }

  export type componentsUpdateManyWithWhereWithoutMealsInput = {
    where: componentsScalarWhereInput
    data: XOR<componentsUpdateManyMutationInput, componentsUncheckedUpdateManyWithoutMealsInput>
  }

  export type componentsScalarWhereInput = {
    AND?: componentsScalarWhereInput | componentsScalarWhereInput[]
    OR?: componentsScalarWhereInput[]
    NOT?: componentsScalarWhereInput | componentsScalarWhereInput[]
    component_id?: IntFilter<"components"> | number
    meal_id?: IntNullableFilter<"components"> | number | null
    component_name?: StringFilter<"components"> | string
    before_cook_weight_g?: DecimalNullableFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: DecimalNullableFilter<"components"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"components"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"components"> | Date | string | null
    category_id?: IntNullableFilter<"components"> | number | null
  }

  export type portion_optionsUpsertWithWhereUniqueWithoutMealsInput = {
    where: portion_optionsWhereUniqueInput
    update: XOR<portion_optionsUpdateWithoutMealsInput, portion_optionsUncheckedUpdateWithoutMealsInput>
    create: XOR<portion_optionsCreateWithoutMealsInput, portion_optionsUncheckedCreateWithoutMealsInput>
  }

  export type portion_optionsUpdateWithWhereUniqueWithoutMealsInput = {
    where: portion_optionsWhereUniqueInput
    data: XOR<portion_optionsUpdateWithoutMealsInput, portion_optionsUncheckedUpdateWithoutMealsInput>
  }

  export type portion_optionsUpdateManyWithWhereWithoutMealsInput = {
    where: portion_optionsScalarWhereInput
    data: XOR<portion_optionsUpdateManyMutationInput, portion_optionsUncheckedUpdateManyWithoutMealsInput>
  }

  export type portion_optionsScalarWhereInput = {
    AND?: portion_optionsScalarWhereInput | portion_optionsScalarWhereInput[]
    OR?: portion_optionsScalarWhereInput[]
    NOT?: portion_optionsScalarWhereInput | portion_optionsScalarWhereInput[]
    portion_id?: IntFilter<"portion_options"> | number
    meal_id?: IntNullableFilter<"portion_options"> | number | null
    size_name?: StringFilter<"portion_options"> | string
    multiplier?: DecimalFilter<"portion_options"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"portion_options"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"portion_options"> | Date | string | null
  }

  export type mealsCreateWithoutPortion_optionsInput = {
    meal_name: string
    description?: string | null
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: string | null
    objective?: string | null
    item_code?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    components?: componentsCreateNestedManyWithoutMealsInput
  }

  export type mealsUncheckedCreateWithoutPortion_optionsInput = {
    meal_id?: number
    meal_name: string
    description?: string | null
    is_balanced?: boolean
    is_gourmet?: boolean
    is_weight_loss?: boolean
    package?: string | null
    objective?: string | null
    item_code?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    components?: componentsUncheckedCreateNestedManyWithoutMealsInput
  }

  export type mealsCreateOrConnectWithoutPortion_optionsInput = {
    where: mealsWhereUniqueInput
    create: XOR<mealsCreateWithoutPortion_optionsInput, mealsUncheckedCreateWithoutPortion_optionsInput>
  }

  export type mealsUpsertWithoutPortion_optionsInput = {
    update: XOR<mealsUpdateWithoutPortion_optionsInput, mealsUncheckedUpdateWithoutPortion_optionsInput>
    create: XOR<mealsCreateWithoutPortion_optionsInput, mealsUncheckedCreateWithoutPortion_optionsInput>
    where?: mealsWhereInput
  }

  export type mealsUpdateToOneWithWhereWithoutPortion_optionsInput = {
    where?: mealsWhereInput
    data: XOR<mealsUpdateWithoutPortion_optionsInput, mealsUncheckedUpdateWithoutPortion_optionsInput>
  }

  export type mealsUpdateWithoutPortion_optionsInput = {
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    components?: componentsUpdateManyWithoutMealsNestedInput
  }

  export type mealsUncheckedUpdateWithoutPortion_optionsInput = {
    meal_id?: IntFieldUpdateOperationsInput | number
    meal_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_balanced?: BoolFieldUpdateOperationsInput | boolean
    is_gourmet?: BoolFieldUpdateOperationsInput | boolean
    is_weight_loss?: BoolFieldUpdateOperationsInput | boolean
    package?: NullableStringFieldUpdateOperationsInput | string | null
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    item_code?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    components?: componentsUncheckedUpdateManyWithoutMealsNestedInput
  }

  export type componentsCreateWithoutRecipe_ingredientsInput = {
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    meals?: mealsCreateNestedOneWithoutComponentsInput
    component_portions?: component_portionsCreateNestedManyWithoutComponentsInput
    category?: component_categoryCreateNestedOneWithoutComponentsInput
  }

  export type componentsUncheckedCreateWithoutRecipe_ingredientsInput = {
    component_id?: number
    meal_id?: number | null
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: number | null
    component_portions?: component_portionsUncheckedCreateNestedManyWithoutComponentsInput
  }

  export type componentsCreateOrConnectWithoutRecipe_ingredientsInput = {
    where: componentsWhereUniqueInput
    create: XOR<componentsCreateWithoutRecipe_ingredientsInput, componentsUncheckedCreateWithoutRecipe_ingredientsInput>
  }

  export type ingredientsCreateWithoutRecipe_ingredientsInput = {
    ingredient_name: string
    default_unit: string
    calories_per_100g: Decimal | DecimalJsLike | number | string
    fat_g: Decimal | DecimalJsLike | number | string
    protein_g: Decimal | DecimalJsLike | number | string
    carbohydrates_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type ingredientsUncheckedCreateWithoutRecipe_ingredientsInput = {
    ingredient_id?: number
    ingredient_name: string
    default_unit: string
    calories_per_100g: Decimal | DecimalJsLike | number | string
    fat_g: Decimal | DecimalJsLike | number | string
    protein_g: Decimal | DecimalJsLike | number | string
    carbohydrates_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type ingredientsCreateOrConnectWithoutRecipe_ingredientsInput = {
    where: ingredientsWhereUniqueInput
    create: XOR<ingredientsCreateWithoutRecipe_ingredientsInput, ingredientsUncheckedCreateWithoutRecipe_ingredientsInput>
  }

  export type componentsUpsertWithoutRecipe_ingredientsInput = {
    update: XOR<componentsUpdateWithoutRecipe_ingredientsInput, componentsUncheckedUpdateWithoutRecipe_ingredientsInput>
    create: XOR<componentsCreateWithoutRecipe_ingredientsInput, componentsUncheckedCreateWithoutRecipe_ingredientsInput>
    where?: componentsWhereInput
  }

  export type componentsUpdateToOneWithWhereWithoutRecipe_ingredientsInput = {
    where?: componentsWhereInput
    data: XOR<componentsUpdateWithoutRecipe_ingredientsInput, componentsUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type componentsUpdateWithoutRecipe_ingredientsInput = {
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meals?: mealsUpdateOneWithoutComponentsNestedInput
    component_portions?: component_portionsUpdateManyWithoutComponentsNestedInput
    category?: component_categoryUpdateOneWithoutComponentsNestedInput
  }

  export type componentsUncheckedUpdateWithoutRecipe_ingredientsInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    component_portions?: component_portionsUncheckedUpdateManyWithoutComponentsNestedInput
  }

  export type ingredientsUpsertWithoutRecipe_ingredientsInput = {
    update: XOR<ingredientsUpdateWithoutRecipe_ingredientsInput, ingredientsUncheckedUpdateWithoutRecipe_ingredientsInput>
    create: XOR<ingredientsCreateWithoutRecipe_ingredientsInput, ingredientsUncheckedCreateWithoutRecipe_ingredientsInput>
    where?: ingredientsWhereInput
  }

  export type ingredientsUpdateToOneWithWhereWithoutRecipe_ingredientsInput = {
    where?: ingredientsWhereInput
    data: XOR<ingredientsUpdateWithoutRecipe_ingredientsInput, ingredientsUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type ingredientsUpdateWithoutRecipe_ingredientsInput = {
    ingredient_name?: StringFieldUpdateOperationsInput | string
    default_unit?: StringFieldUpdateOperationsInput | string
    calories_per_100g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ingredientsUncheckedUpdateWithoutRecipe_ingredientsInput = {
    ingredient_id?: IntFieldUpdateOperationsInput | number
    ingredient_name?: StringFieldUpdateOperationsInput | string
    default_unit?: StringFieldUpdateOperationsInput | string
    calories_per_100g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fat_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    protein_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carbohydrates_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type componentsCreateWithoutCategoryInput = {
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    meals?: mealsCreateNestedOneWithoutComponentsInput
    recipe_ingredients?: recipe_ingredientsCreateNestedManyWithoutComponentsInput
    component_portions?: component_portionsCreateNestedManyWithoutComponentsInput
  }

  export type componentsUncheckedCreateWithoutCategoryInput = {
    component_id?: number
    meal_id?: number | null
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    recipe_ingredients?: recipe_ingredientsUncheckedCreateNestedManyWithoutComponentsInput
    component_portions?: component_portionsUncheckedCreateNestedManyWithoutComponentsInput
  }

  export type componentsCreateOrConnectWithoutCategoryInput = {
    where: componentsWhereUniqueInput
    create: XOR<componentsCreateWithoutCategoryInput, componentsUncheckedCreateWithoutCategoryInput>
  }

  export type componentsCreateManyCategoryInputEnvelope = {
    data: componentsCreateManyCategoryInput | componentsCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type componentsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: componentsWhereUniqueInput
    update: XOR<componentsUpdateWithoutCategoryInput, componentsUncheckedUpdateWithoutCategoryInput>
    create: XOR<componentsCreateWithoutCategoryInput, componentsUncheckedCreateWithoutCategoryInput>
  }

  export type componentsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: componentsWhereUniqueInput
    data: XOR<componentsUpdateWithoutCategoryInput, componentsUncheckedUpdateWithoutCategoryInput>
  }

  export type componentsUpdateManyWithWhereWithoutCategoryInput = {
    where: componentsScalarWhereInput
    data: XOR<componentsUpdateManyMutationInput, componentsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type recipe_ingredientsCreateManyComponentsInput = {
    ingredient_id: number
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type component_portionsCreateManyComponentsInput = {
    portion_id?: number
    label: string
    total_weight_g: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type recipe_ingredientsUpdateWithoutComponentsInput = {
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ingredients?: ingredientsUpdateOneRequiredWithoutRecipe_ingredientsNestedInput
  }

  export type recipe_ingredientsUncheckedUpdateWithoutComponentsInput = {
    ingredient_id?: IntFieldUpdateOperationsInput | number
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type recipe_ingredientsUncheckedUpdateManyWithoutComponentsInput = {
    ingredient_id?: IntFieldUpdateOperationsInput | number
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type component_portionsUpdateWithoutComponentsInput = {
    label?: StringFieldUpdateOperationsInput | string
    total_weight_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type component_portionsUncheckedUpdateWithoutComponentsInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    total_weight_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type component_portionsUncheckedUpdateManyWithoutComponentsInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    total_weight_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type recipe_ingredientsCreateManyIngredientsInput = {
    component_id: number
    raw_quantity_g: Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type recipe_ingredientsUpdateWithoutIngredientsInput = {
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    components?: componentsUpdateOneRequiredWithoutRecipe_ingredientsNestedInput
  }

  export type recipe_ingredientsUncheckedUpdateWithoutIngredientsInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type recipe_ingredientsUncheckedUpdateManyWithoutIngredientsInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    raw_quantity_g?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cooked_quantity_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type componentsCreateManyMealsInput = {
    component_id?: number
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    category_id?: number | null
  }

  export type portion_optionsCreateManyMealsInput = {
    portion_id?: number
    size_name: string
    multiplier: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type componentsUpdateWithoutMealsInput = {
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipe_ingredients?: recipe_ingredientsUpdateManyWithoutComponentsNestedInput
    component_portions?: component_portionsUpdateManyWithoutComponentsNestedInput
    category?: component_categoryUpdateOneWithoutComponentsNestedInput
  }

  export type componentsUncheckedUpdateWithoutMealsInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    recipe_ingredients?: recipe_ingredientsUncheckedUpdateManyWithoutComponentsNestedInput
    component_portions?: component_portionsUncheckedUpdateManyWithoutComponentsNestedInput
  }

  export type componentsUncheckedUpdateManyWithoutMealsInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type portion_optionsUpdateWithoutMealsInput = {
    size_name?: StringFieldUpdateOperationsInput | string
    multiplier?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type portion_optionsUncheckedUpdateWithoutMealsInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    size_name?: StringFieldUpdateOperationsInput | string
    multiplier?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type portion_optionsUncheckedUpdateManyWithoutMealsInput = {
    portion_id?: IntFieldUpdateOperationsInput | number
    size_name?: StringFieldUpdateOperationsInput | string
    multiplier?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type componentsCreateManyCategoryInput = {
    component_id?: number
    meal_id?: number | null
    component_name: string
    before_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type componentsUpdateWithoutCategoryInput = {
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meals?: mealsUpdateOneWithoutComponentsNestedInput
    recipe_ingredients?: recipe_ingredientsUpdateManyWithoutComponentsNestedInput
    component_portions?: component_portionsUpdateManyWithoutComponentsNestedInput
  }

  export type componentsUncheckedUpdateWithoutCategoryInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipe_ingredients?: recipe_ingredientsUncheckedUpdateManyWithoutComponentsNestedInput
    component_portions?: component_portionsUncheckedUpdateManyWithoutComponentsNestedInput
  }

  export type componentsUncheckedUpdateManyWithoutCategoryInput = {
    component_id?: IntFieldUpdateOperationsInput | number
    meal_id?: NullableIntFieldUpdateOperationsInput | number | null
    component_name?: StringFieldUpdateOperationsInput | string
    before_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    after_cook_weight_g?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}