name: <%= name %>

type: <%= type %>

description: Description of the workout goes here

section: <%= section %>
<% if (typeof parent !== 'undefined') { %>
parent: <%= parent %>
<% } %>
insights:
  - list-of-insight-slugs-in-order
