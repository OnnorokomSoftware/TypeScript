// @strict: true

// Repro from #14091

interface Foo {
    foo(): void
}

class A<P extends Partial<Foo>> {
    props: Readonly<P>
    doSomething() {
        this.props.foo && this.props.foo()
    }
}

// Repro from #14415

interface Banana {
    color: 'yellow';
}

class Monkey<T extends Banana | undefined> {
    a: T;
    render() {
        if (this.a) {
            this.a.color;
        }
    }
}

interface BigBanana extends Banana {
}

class BigMonkey extends Monkey<BigBanana> {
    render() {
        if (this.a) {
            this.a.color;
        }
    }
}

// Another repro

type Item = {
    (): string;
    x: string;
}

function f1<T extends Item | undefined>(obj: T) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}

function f2<T extends Item | undefined>(obj: T | undefined) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}

function f3<T extends Item | undefined>(obj: T | null) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}

function f4<T extends string[] | undefined>(obj: T | undefined, x: number) {
    if (obj) {
        obj[x].length;
    }
}
