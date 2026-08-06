type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalid: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(i: number) {
        this.#interval = i;
        this.#startReapLoop();
    }
    add<T>(k: string, val: T): void {
        this.#cache.set(k, {
            createdAt: Date.now(),
            val: val,
        });
    }

    get<T>(k: string): T | undefined {
        const c = this.#cache.get(k);
        if (c === undefined) {
            return c;
        }
        return c.val;
    }

    #reap() {
        for (let k of this.#cache.keys()) {
            const c = this.#cache.get(k)
            if (c === undefined) {
                continue;
            }
            if (c.createdAt < (Date.now() - this.#interval)) {
                this.#cache.delete(k);
            }
        }
    }

    #startReapLoop() {
        setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalid)
    }
}