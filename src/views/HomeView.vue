<template>
  <div>
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
      >
        <router-link :to="'/items/' + item.id">{{ item.name }}</router-link>
        <button @click="editItem(item.id)">Edit</button>
        <button @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script></script>
