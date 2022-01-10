import type { CacheAxiosResponse, CacheRequestConfig } from '../cache/axios';
import type {
  CachedStorageValue,
  LoadingStorageValue,
  StorageValue
} from '../storage/types';

export type CachePredicate<R = unknown, D = unknown> = Exclude<
  CachePredicateObject<R, D> | CachePredicateObject<R, D>['responseMatch'],
  undefined
>;

export type CachePredicateObject<R = unknown, D = unknown> = {
  /** Matches if this function returned true. */
  statusCheck?: (status: number) => MaybePromise<boolean>;

  /**
   * Matches if all keys in this object returned true.
   *
   * The response does not contain all headers specified here, the specified function will
   * be called without argument.
   *
   * ### Remember, all axios headers are lowercase.
   */
  containsHeaders?: Record<string, (header?: string) => MaybePromise<boolean>>;

  /** Check if the response matches this predicate. */
  responseMatch?: (res: CacheAxiosResponse<R, D>) => MaybePromise<boolean>;
};

/** A simple function that receives a cache request config and should return a string id for it. */
export type KeyGenerator = <R = unknown, D = unknown>(
  options: CacheRequestConfig<R, D>
) => string;

export type MaybePromise<T> = T | Promise<T> | PromiseLike<T>;

export type CacheUpdater<R, D> =
  | 'delete'
  | ((
      cached: Exclude<StorageValue, LoadingStorageValue>,
      response: CacheAxiosResponse<R, D>
    ) => MaybePromise<CachedStorageValue | 'delete' | 'ignore'>);
