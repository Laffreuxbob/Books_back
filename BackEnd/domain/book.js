class Book {
    constructor(id, title, author, summary, img_url, date , rating, tag) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._summary = summary;
        this._img_url = img_url;
        this._date = date;
        this._rating = rating;
        this._tag = tag;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get summary() {
        return this._summary;
    }

    set summary(value) {
        this._summary = value;
    }

    get img_url() {
        return this._img_url;
    }

    set img_url(value) {
        this._img_url = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get tag() {
        return this._tag;
    }

    set tag(value) {
        this._tag = value;
    }
}