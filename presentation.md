# Sample Reveal-md + Twemoji 😎

---

## Demo presentation

Based from [this blog post](https://lacourt.dev/2019/03/12/) and [this one too](https://lacourt.dev/2019/03/14/)

----

## Printing PDF

- `npm run export:pdf`
- open `presentation.pdf`
- look at those beautifully rendered emojis

----

## Export static website

- `npm run export:site`
- open `_site/index.html`
- look at this presentation with its beautifully rendered emojis

---

## Fragments

This will appear after some action
<!-- .element: class="fragment" -->

----

### you went down 👇

Now go ➡️

---

## I told you about iframes

<iframe style="height: 50vh; width: 100%; vertical-scroll: none;"  data-src="https://lacourt.dev/2019/03/12/#-iframes"></iframe>

---

## Here is a fragmented ordered list with emojis inside
<ol>
  <li class="fragment"> 🔍 let's check this</li>
  <li class="fragment"> 🎩 magic hat</li>
  <li class="fragment"> 👀 look to your left</li>
  <li class="fragment"> 🤹‍♀️ I'm juggling</li>
</ol>

---

> I think I told you about quotes?

---

![win](https://media.giphy.com/media/eoxomXXVL2S0E/giphy.gif)
<a href="https://giphy.com/gifs/internet-eoxomXXVL2S0E">via GIPHY</a></p>
<!-- .element: style="height: 50vh !important;" -->

this is a GIF for which I had to tweak the height.

this boy definitely looks like me when I was 10!
<!-- .element: style="font-size: .4em !important;" -->

---

## Now some code sample with highlights

<div class="fragment">👇</div>

----
<!-- .slide: data-transition="none" -->

```

(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    get_local $lhs
    get_local $rhs
    i32.add)
  (export "add" (func $add))
)

```

----
<!-- .slide: data-transition="none" -->

```
```
<!-- .element: class="transparent before" -->
```
(module
```
```
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    get_local $lhs
    get_local $rhs
    i32.add)
  (export "add" (func $add))
)

```
<!-- .element: class="transparent after" -->

----
<!-- .slide: data-transition="none" -->

```

(module
```
<!-- .element: class="transparent before" -->
```
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
```
```
    get_local $lhs
    get_local $rhs
    i32.add)
  (export "add" (func $add))
)

```
<!-- .element: class="transparent after" -->

----
<!-- .slide: data-transition="none" -->

```

(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    get_local $lhs
    get_local $rhs
    i32.add)
```
<!-- .element: class="transparent before" -->
```
  (export "add" (func $add))
)

```

---

## Questions 🤨 ?
<!-- .slide: data-background-color="rgb(220,75,68)" style="color: white !important;" -->

---

## Thanks 🙇‍ !
<!-- .slide: data-background-color="lightblue" data-text-color="white" -->

---

<!-- .slide: data-background-color="gray" style="color: white !important;" -->

## References, Sources & Articles

<ul>
    <li>first link</li>
    <li>second link</li>
</ul>
<!-- .element: style="font-size: .35em !important;" -->
