export class InMemoryCache{
    private static instance:InMemoryCache  | undefined
    private map = new Map()
    private constructor(){}
    static getInstance(){
        if(this.instance==null){
            this.instance = new InMemoryCache()
            return this.instance
        }
        return this.instance
    }
    set(key:string,value:any){
        this.map.set(key,value)
    }
    get(key:string){
        return this.map.get(key)
    }
}