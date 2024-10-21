import { Subscription } from "rxjs";

export class MapsSubscriptionContainer{
    private subs: Subscription[] = [];

    public set add(s: Subscription){
        this.subs.push(s);
    }

    public dispose() {
        this.subs.forEach(s => s.unsubscribe());
    }
}