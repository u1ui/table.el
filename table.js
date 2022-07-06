
// creation of the u1-table element

class Table extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
            :host {
                display: block;
                overflow: auto;
            }
            </style>
            <slot></slot>
        `;
    }
    connectedCallback() {
        /* auto break */
        this.table = this.firstElementChild;
        // this.addEventListener('overflow', e => {}); // firefox
        // this.addEventListener('underflow', e => {}); // firefox
        // this.addEventListener('overflowchanged', e => {}); // safari
        this.resizeObs = new ResizeObserver(entries => {
            const overflows = this.scrollWidth > this.clientWidth;
            if (overflows) this._breakpoint = this.scrollWidth; // overflows && this._breakpoint === null ???

            if (this._breakpoint != null && this._breakpoint > this.clientWidth) {
                this.setAttribute('broken', '');
            } else {
                this.removeAttribute('broken');
            }
        });
        this.resizeObs.observe(this);


        this.mutObs = new MutationObserver(mutations => {
            this._onmutate();
        });
        this.mutObs.observe(this, {childList: true, subtree: true});
        this._onmutate();
    }
    _onmutate() {

        this._breakpoint = null; // reset evaluated breakpoint

        // set aria-labels
        const tr = this.table.querySelector(':scope > thead > tr');
        if (tr) {
            for (const th of tr.children) {
                const title = th.innerText;
                const index = this.columns.indexOf(th);
                for (const td of this.columns.item(index).cells) {
                    td.setAttribute('aria-label', title);
                }
            }
        }
    }

    get columns() {
        if (!this._columns) this._columns = new Columns(this.table);
        return this._columns;
    }

}


/* are there memory leaks? */

class Columns {
    constructor(table) {
        this.table = table;
        this._columns = {};
    }
    get length() {
        const last = this.table.querySelector(':scope > * > tr > :last-child');
        return this.indexOf(last)+1; // todo: endIndexOf
    }
    indexOf(cell) {
        let currentIndex = -1;
        for (const td of cell.parentNode.children) {
            ++currentIndex;
            if (td === cell) return currentIndex;
            if (td.columnspan > 1) currentIndex += td.columnspan -1;
        }
    }
    item(i) {
        if (!this._columns[i]) {
            this._columns[i] = new Column(this.table, i);
        }
        return this._columns[i];
    }
    [Symbol.iterator]() {
        const length = this.length;
        let i = 0;
        return {
            next: () => ({
                value: this.item(i++),
                done: i > length,
            })
        }
    }
}

class Column {
    constructor(table, index) {
        this.table = table;
        this.index = index;
    }
    get cells(){
        const cells = [];
        for (const group of this.table.children) {
            this.cellsByGroup(group).forEach(cell => cells.push(cell));
        }
        return cells;
    }
    get headerCells(){
        const group = this.querySelector('thead');
    }
    cellsByGroup(group){
        const cells = [];
        for (const row of group.children) {
            let currentIndex = -1;
            for (const cell of row.children) {
                currentIndex += (cell.columnspan||1);
                if (currentIndex >= this.index) {
                    cells.push(cell);
                    break; // next row
                }
            }
        }
        return cells;
    }
}

customElements.define('u1-table', Table);