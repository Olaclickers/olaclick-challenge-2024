<template>

    <header class="m-3">
        <div class="h1">{{msg}}</div>
        <div class="h3">{{msg2}}</div>
    </header>

</template>

<script>

export default{

    name: 'AppHeader',
    props: {

        msg: String,
        msg2: String

    }
}

</script>