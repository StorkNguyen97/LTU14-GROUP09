<template>
  <AppHeader fixed>
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" to="#">
      <img src="https://www.cprime.com/wp-content/uploads/2015/05/3.png" height="100%" class="logo"/>
    </b-link>
    <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
    <b-navbar-nav class="ml-auto">
      <DefaultHeaderDropdownAccnt />
    </b-navbar-nav>
  </AppHeader>
</template>
<script>
import { Header as AppHeader, SidebarToggler } from "@coreui/vue";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";

export default {
  name: "DefaultHeader",
  components: {
    AppHeader,
    DefaultHeaderDropdownAccnt,
    SidebarToggler
  }
};
</script>
