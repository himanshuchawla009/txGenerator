module.exports = {
    contractTemplate: `
    
pragma solidity 0.5.10;
contract template  {
  //struct of properties  
  <%for(let i=0;i< properties.length;i=i+8) { %>
  struct properties<%= i %> {
  <%for(let j=0;j< 8;j++) { %>
    <% if(properties[i+j] != undefined) { %> 
    <%= properties[i+j].datatype %> <%= properties[i+j].name  %>;
    <%}%>
  <%}%>
  }
  <%}%>
  <%for(let i=0;i< properties.length;i=i+8) { %>
      mapping(uint256 => properties<%= i %>) assetProperties<%= i %>;
  <%}%>
  constructor() public 
  {
    <%for(let i=0;i< properties.length;i=i+8) { %>
        assetProperties<%= i  %>[0] = properties<%= i %>({
            <%for(let j=0;j<8;j++) { %>
                <% if(properties[i+j] != undefined) { %> 
                  <%= properties[i+j].name  %> : <% if(properties[i+j].datatype === "string") { %>"<%=properties[i+j].value %>" <% } %><% if(properties[i+j].datatype === "uint") { %> <%=properties[i+j].value %> <% } %><% if(properties[i+j].datatype === "address") { %> address(<%=properties[i+j].value %>)<% } %><% if(properties[i+j].datatype === "bool") { %><%=properties[i+j].value %> <% } %> <% if(j < 7 &&  (properties.length != i+j+1))  { %>, <%}%>
                <%}%>
            <%}%>
        });
        <%}%>
  }
}`

}