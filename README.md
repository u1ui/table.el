# &lt;u1-table&gt; - element
Better tables

## Features

- Behavior that you can't cover without css.
- Responsive (breaks of overflows)
- Sets the header-cell text as aria-label on each cell

## Ussage

```js
// console.log(test.columns)
// console.log(test.columns.item(2))
// console.log(test.columns.item(2).cells);
```

```html
<u1-table style="white-space:nowrap" id=test>
    <table>
        <thead>
            <tr>
                <th> Firstname
                <th> Lastname
                <th> Age
        <tbody>
            <tr>
                <td> Adam
                <td> Hungentobler
                <td> 88
            <tr>
                <td> Wolfgang Amadeus
                <td> Mozart
                <td> 46
            <tr>
                <td> Provident, quisquam.
                <td> Omnis, quisquam.
                <td> Tempora, quisquam.
    </table>
</u1-table>
```

```css
u1-qrcode {
    color:#555;
    max-width:10rem;
    margin:auto;
}
```

## Install

```html
<link href="https://cdn.jsdelivr.net/gh/u1ui/table.el@1.0.0/table.min.css" rel=stylesheet>
<script src="https://cdn.jsdelivr.net/gh/u1ui/table.el@1.0.0/table.min.js" type=module>
```

## Demos

[minimal.html](http://gcdn.li/u1ui/table.el@main/tests/minimal.html)  

## About

- MIT License, Copyright (c) 2022 <u1> (like all repositories in this organization) <br>
- Suggestions, ideas, finding bugs and making pull requests make us very happy. ♥

