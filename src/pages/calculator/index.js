class Ohno {
    constructor(name) {
        this.name = name;
    }

    compareTo(other) {
        if (/^[0-9]{2}/.test(this.name)) {
            if (/^[0-9]{2}/.test(other.name)) { //a=00hoge, b=01fuga
                return this.name.substring(0, 2) - other.name.substring(0, 2);
            } else { //a=00hoge, b=fuga
                return -1;
            }
        } else {
            if (/^[0-9]{2}/.test(other.name)) { //a=hoge, b=01fuga
                return 1;
            } else { //a=hoge, b=fuga
                return this.name.localeCompare(other.name);
            }
        }
    }
}

const a = [new Ohno("xyz"), new Ohno("02fuga"), new Ohno("(ok)h"), new Ohno("dhg"), new Ohno("abc"), new Ohno("01hoge"), new Ohno("一"), new Ohno("いち"), new Ohno("さん"), new Ohno("三")];
console.log(a);
const b = a.sort((e1, e2) => e1.compareTo(e2));
console.log(b);
