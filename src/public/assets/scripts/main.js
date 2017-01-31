biigle.$viewModel("label-trees-authorized-projects",function(e){var t=biigle.$require("messages.store"),i=biigle.$require("api.projects"),l=biigle.$require("api.labelTree"),s=biigle.$require("labelTrees.privateVisibilityId");new Vue({el:e,mixins:[biigle.$require("labelTrees.mixins.loader"),biigle.$require("labelTrees.mixins.editor")],data:{labelTree:biigle.$require("labelTrees.labelTree"),ownProjects:[],authorizedProjects:biigle.$require("labelTrees.authorizedProjects"),authorizedOwnProjects:biigle.$require("labelTrees.authorizedOwnProjects")},components:{typeahead:biigle.$require("labelTrees.components.typeahead")},computed:{isPrivate:function(){return this.labelTree.visibility_id===s},classObject:function(){return{"panel-warning":this.editing}},authorizableProjects:function(){var e=this;return this.ownProjects.filter(function(t){for(var i=e.authorizedProjects.length-1;i>=0;i--)if(e.authorizedProjects[i].id===t.id)return!1;return!0})},hasAuthorizedProjects:function(){return this.authorizedProjects.length>0}},methods:{fetchOwnProjects:function(){var e=this;i.query().then(function(t){Vue.set(e,"ownProjects",t.body)},t.handleErrorResponse)},addAuthorizedProject:function(e){var i=this;this.startLoading(),l.addAuthorizedProject({id:this.labelTree.id},{id:e.id}).then(function(){i.authorizedProjectAdded(e)},t.handleErrorResponse).finally(this.finishLoading)},authorizedProjectAdded:function(e){this.authorizedProjects.push(e),this.authorizedOwnProjects.push(e.id)},removeAuthorizedProject:function(e){var i=this;this.startLoading(),l.removeAuthorizedProject({id:this.labelTree.id,project_id:e.id}).then(function(){i.authorizedProjectRemoved(e)},t.handleErrorResponse).finally(this.finishLoading)},authorizedProjectRemoved:function(e){var t;for(t=this.authorizedProjects.length-1;t>=0;t--)this.authorizedProjects[t].id===e.id&&this.authorizedProjects.splice(t,1);t=this.authorizedOwnProjects.indexOf(e.id),t!==-1&&this.authorizedOwnProjects.splice(t,1)},isOwnProject:function(e){return this.authorizedOwnProjects.indexOf(e.id)!==-1}},created:function(){this.$once("editing.start",this.fetchOwnProjects)}})}),biigle.$viewModel("label-trees-labels",function(e){var t=biigle.$require("api.labels"),i=biigle.$require("messages.store"),l=biigle.$require("labelTrees.randomColor"),s=biigle.$require("labelTrees.labelTree");new Vue({el:e,mixins:[biigle.$require("labelTrees.mixins.loader"),biigle.$require("labelTrees.mixins.editor")],data:{labels:biigle.$require("labelTrees.labels"),selectedColor:l(),selectedLabel:null,selectedName:""},components:{tabs:VueStrap.tabs,tab:VueStrap.tab,labelTree:biigle.$require("labelTrees.components.labelTree"),manualLabelForm:biigle.$require("labelTrees.components.manualLabelForm"),wormsLabelForm:biigle.$require("labelTrees.components.wormsLabelForm")},computed:{classObject:function(){return{"panel-warning":this.editing}}},methods:{deleteLabel:function(e){var l=this;this.startLoading(),t.delete({id:e.id}).then(function(){l.labelDeleted(e)},i.handleErrorResponse).finally(this.finishLoading)},labelDeleted:function(e){this.selectedLabel&&this.selectedLabel.id===e.id&&this.deselectLabel(e);for(var t=this.labels.length-1;t>=0;t--)if(this.labels[t].id===e.id){this.labels.splice(t,1);break}},selectLabel:function(e){this.selectedLabel=e,e?(this.selectedColor="#"+e.color,this.$emit("select",e)):this.$emit("clear")},deselectLabel:function(e){this.selectedLabel=null,this.$emit("deselect",e)},selectColor:function(e){this.selectedColor=e},selectName:function(e){this.selectedName=e},insertLabel:function(e){Vue.set(e,"open",!1),Vue.set(e,"selected",!1);for(var t=e.name.toLowerCase(),i=0,l=this.labels.length;i<l;i++)if(this.labels[i].name.toLowerCase()>=t)return void this.labels.splice(i,0,e);this.labels.push(e)},createLabel:function(e){this.loading||(this.startLoading(),t.save({label_tree_id:s.id},e).then(this.labelCreated,i.handleErrorResponse).finally(this.finishLoading))},labelCreated:function(e){e.data.forEach(this.insertLabel),this.selectedColor=l(),this.selectedName=""}}})}),biigle.$viewModel("label-trees-members",function(e){var t=biigle.$require("messages.store"),i=biigle.$require("labelTrees.labelTree"),l=biigle.$require("api.labelTree");new Vue({el:e,mixins:[biigle.$require("labelTrees.mixins.loader")],data:{members:biigle.$require("labelTrees.members"),roles:biigle.$require("labelTrees.roles"),defaultRole:biigle.$require("labelTrees.defaultRoleId"),userId:biigle.$require("labelTrees.userId")},components:{membersPanel:biigle.$require("labelTrees.components.membersPanel")},computed:{},methods:{attachMember:function(e){this.startLoading();var s=this;l.addUser({id:i.id},{id:e.id,role_id:e.role_id}).then(function(){s.memberAttached(e)},t.handleResponseError).finally(this.finishLoading)},memberAttached:function(e){this.members.push(e)},updateMember:function(e,s){this.startLoading();var r=this;l.updateUser({id:i.id,user_id:e.id},{role_id:s.role_id}).then(function(){r.memberUpdated(e,s)},t.handleResponseError).finally(this.finishLoading)},memberUpdated:function(e,t){e.role_id=t.role_id},removeMember:function(e){this.startLoading();var s=this;l.removeUser({id:i.id,user_id:e.id}).then(function(){s.memberRemoved(e)},t.handleResponseError).finally(this.finishLoading)},memberRemoved:function(e){for(var t=this.members.length-1;t>=0;t--)this.members[t].id===e.id&&this.members.splice(t,1)}}})}),biigle.$viewModel("label-trees-title",function(e){var t=biigle.$require("messages.store"),i=biigle.$require("labelTrees.labelTree"),l=biigle.$require("labelTrees.privateVisibilityId"),s=biigle.$require("api.labelTree");new Vue({el:e,mixins:[biigle.$require("labelTrees.mixins.loader"),biigle.$require("labelTrees.mixins.editor")],data:{labelTree:i,name:i.name,description:i.description,visibility_id:i.visibility_id},computed:{isPrivate:function(){return this.labelTree.visibility_id===l},hasDescription:function(){return!!this.description.length},isChanged:function(){return this.name!==this.labelTree.name||this.description!==this.labelTree.description||parseInt(this.visibility_id)!==this.labelTree.visibility_id}},methods:{discardChanges:function(){this.finishEditing(),this.name=this.labelTree.name,this.description=this.labelTree.description,this.visibility_id=this.labelTree.visibility_id},leaveTree:function(){var e=confirm("Do you really want to leave the label tree "+this.labelTree.name+"?");e&&(this.startLoading(),s.removeUser({id:this.labelTree.id,user_id:biigle.$require("labelTrees.userId")}).then(this.treeLeft,t.handleErrorResponse).finally(this.finishLoading))},treeLeft:function(){this.isPrivate?(t.success("You left the label tree. Redirecting..."),setTimeout(function(){location.href=biigle.$require("labelTrees.redirectUrl")},2e3)):location.reload()},deleteTree:function(){var e=confirm("Do you really want to delete the label tree "+this.labelTree.name+"?");e&&(this.startLoading(),s.delete({id:this.labelTree.id}).then(this.treeDeleted,t.handleErrorResponse).finally(this.finishLoading))},treeDeleted:function(){t.success("The label tree was deleted. Redirecting..."),setTimeout(function(){location.href=biigle.$require("labelTrees.redirectUrl")},2e3)},saveChanges:function(){this.startLoading(),s.update({id:this.labelTree.id},{name:this.name,description:this.description,visibility_id:this.visibility_id}).then(this.changesSaved,t.handleErrorResponse).finally(this.finishLoading)},changesSaved:function(){this.labelTree.name=this.name,this.labelTree.description=this.description,this.labelTree.visibility_id=parseInt(this.visibility_id),this.finishEditing()}}})}),biigle.$declare("labelTrees.randomColor",function(){var e=[0,.5,.9],t=[360,1,1],i=[0,2,2],l=function(e){var t,i=e[0]/60,l=Math.floor(i),s=i-l,r=[e[2]*(1-e[1]),e[2]*(1-e[1]*s),e[2]*(1-e[1]*(1-s))];switch(l){case 1:t=[r[1],e[2],r[0]];break;case 2:t=[r[0],e[2],r[2]];break;case 3:t=[r[0],r[1],e[2]];break;case 4:t=[r[2],r[0],e[2]];break;case 5:t=[e[2],r[0],r[1]];break;default:t=[e[2],r[2],r[0]]}return t.map(function(e){return Math.round(255*e)})},s=function(e){return e.map(function(e){return e=e.toString(16),1===e.length?"0"+e:e})};return function(){for(var r,a=[0,0,0],n=a.length-1;n>=0;n--)r=10*i[n],a[n]=(t[n]-e[n])*Math.random()+e[n],0!==r?a[n]=Math.round(a[n]*r)/r:a[n]=Math.round(a[n]);return"#"+s(l(a)).join("")}}),biigle.$declare("api.labelSource",Vue.resource("/api/v1/label-sources{/id}/find")),biigle.$declare("api.labelTree",Vue.resource("/api/v1/label-trees{/id}",{},{addAuthorizedProject:{method:"POST",url:"/api/v1/label-trees{/id}/authorized-projects"},removeAuthorizedProject:{method:"DELETE",url:"/api/v1/label-trees{/id}/authorized-projects{/project_id}"},addUser:{method:"POST",url:"/api/v1/label-trees{/id}/users"},updateUser:{method:"PUT",url:"/api/v1/label-trees{/id}/users{/user_id}"},removeUser:{method:"DELETE",url:"/api/v1/label-trees{/id}/users{/user_id}"}})),biigle.$declare("api.labels",Vue.resource("/api/v1/labels{/id}",{},{save:{method:"POST",url:"/api/v1/label-trees{/label_tree_id}/labels"}})),biigle.$declare("api.projects",Vue.resource("/api/v1/projects{/id}",{},{query:{url:"/api/v1/projects/my"}})),biigle.$declare("api.users",Vue.resource("/api/v1/users{/id}",{},{find:{method:"GET",url:"/api/v1/users/find{/query}"}})),biigle.$component("labelTrees.components.labelTree",{template:'<div class="label-tree"><h4 class="label-tree__title" v-if="showTitle"><button v-if="collapsible" @click.stop="collapse" class="btn btn-default btn-xs pull-right" :title="collapseTitle"><span v-if="collapsed" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span><span v-else class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>{{name}}</h4><ul v-if="!collapsed" class="label-tree__list"><label-tree-label :label="label" :deletable="deletable" v-for="label in rootLabels" @select="emitSelect" @deselect="emitDeselect" @delete="emitDelete"></label-tree-label></ul></div>',data:function(){return{collapsed:!1}},components:{labelTreeLabel:biigle.$require("labelTrees.components.labelTreeLabel")},props:{name:{type:String,required:!0},labels:{type:Array,required:!0},showTitle:{type:Boolean,default:!0},standalone:{type:Boolean,default:!1},collapsible:{type:Boolean,default:!0},multiselect:{type:Boolean,default:!1},deletable:{type:Boolean,default:!1}},computed:{labelMap:function(){for(var e={},t=this.labels.length-1;t>=0;t--)e[this.labels[t].id]=this.labels[t];return e},compiledLabels:function(){for(var e,t={},i=0,l=this.labels.length;i<l;i++)e=this.labels[i].parent_id,t.hasOwnProperty(e)?t[e].push(this.labels[i]):t[e]=[this.labels[i]];for(i=this.labels.length-1;i>=0;i--)t.hasOwnProperty(this.labels[i].id)?Vue.set(this.labels[i],"children",t[this.labels[i].id]):(Vue.set(this.labels[i],"children",void 0),this.labels[i].open=!1);return t},rootLabels:function(){return this.compiledLabels[null]},collapseTitle:function(){return this.collapsed?"Expand":"Collapse"}},methods:{hasLabel:function(e){return this.labelMap.hasOwnProperty(e)},getLabel:function(e){return this.labelMap[e]},getParents:function(e){for(var t=[];null!==e.parent_id;)e=this.getLabel(e.parent_id),t.unshift(e.id);return t},emitSelect:function(e){this.$emit("select",e)},emitDeselect:function(e){this.$emit("deselect",e)},emitDelete:function(e){this.$emit("delete",e)},selectLabel:function(e){if(this.multiselect||this.clearSelectedLabels(),this.hasLabel(e.id)){e.selected=!0,this.collapsed=!1;for(var t=this.getParents(e),i=t.length-1;i>=0;i--)this.getLabel(t[i]).open=!0}},deselectLabel:function(e){this.hasLabel(e.id)&&(e.selected=!1)},clearSelectedLabels:function(){for(var e=this.labels.length-1;e>=0;e--)this.labels[e].selected=!1},collapse:function(){this.collapsed=!this.collapsed}},created:function(){for(i=this.labels.length-1;i>=0;i--)Vue.set(this.labels[i],"open",!1),Vue.set(this.labels[i],"selected",!1);this.standalone?(this.$on("select",this.selectLabel),this.$on("deselect",this.deselectLabel)):(this.$parent.$on("select",this.selectLabel),this.$parent.$on("deselect",this.deselectLabel),this.$parent.$on("clear",this.clearSelectedLabels))}}),biigle.$component("labelTrees.components.labelTreeLabel",{name:"label-tree-label",template:'<li class="label-tree-label cf" :class="classObject"><div class="label-tree-label__name" @click="toggleOpen"><span class="label-tree-label__color" :style="colorStyle"></span><span v-text="label.name" @click.stop="toggleSelect"></span><span v-if="showFavourite" class="label-tree-label__favourite" @click.stop="toggleFavourite"><span class="glyphicon" :class="favouriteClass" aria-hidden="true" title=""></span></span><button v-if="deletable" type="button" class="close label-tree-label__delete" :title="deleteTitle" @click.stop="deleteThis"><span aria-hidden="true">&times;</span></button></div><ul v-if="label.open" class="label-tree__list"><label-tree-label :label="child" :deletable="deletable" v-for="child in label.children" @select="emitSelect" @deselect="emitDeselect" @delete="emitDelete"></label-tree-label></ul></li>',data:function(){return{favourite:!1}},props:{label:{type:Object,required:!0},showFavourite:{type:Boolean,required:!1},deletable:{type:Boolean,default:!1}},computed:{classObject:function(){return{"label-tree-label--selected":this.label.selected,"label-tree-label--expandable":this.label.children}},colorStyle:function(){return{"background-color":"#"+this.label.color}},favouriteClass:function(){return{"glyphicon-star-empty":!this.favourite,"glyphicon-star":this.favourite}},deleteTitle:function(){return"Remove label "+this.label.name}},methods:{toggleSelect:function(){this.label.selected?this.$emit("deselect",this.label):this.$emit("select",this.label)},deleteThis:function(){this.emitDelete(this.label)},toggleOpen:function(){this.label.children?this.label.open=!this.label.open:this.toggleSelect()},toggleFavourite:function(){this.favourite=!this.favourite},emitSelect:function(e){this.$emit("select",e)},emitDeselect:function(e){this.$emit("deselect",e)},emitDelete:function(e){this.$emit("delete",e)}}}),biigle.$component("labelTrees.components.labelTrees",{template:'<div class="label-trees"><div v-if="typeahead || clearable" class="label-trees__head"><button v-if="clearable" @click="clear" class="btn btn-default" title="Clear selected labels"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><typeahead v-if="typeahead" :items="labels" @select="handleSelect" placeholder="Label name"></typeahead></div><div class="label-trees__body"><label-tree :name="tree.name" :labels="tree.labels" :multiselect="multiselect" v-for="tree in trees" @select="handleSelect" @deselect="handleDeselect"></label-tree></div></div>',components:{typeahead:biigle.$require("labelTrees.components.typeahead"),labelTree:biigle.$require("labelTrees.components.labelTree")},props:{trees:{type:Array,required:!0},typeahead:{type:Boolean,default:!0},clearable:{type:Boolean,default:!0},multiselect:{type:Boolean,default:!1}},computed:{labels:function(){for(var e=[],t=this.trees.length-1;t>=0;t--)Array.prototype.push.apply(e,this.trees[t].labels);return e}},methods:{handleSelect:function(e){this.$emit("select",e)},handleDeselect:function(e){this.$emit("deselect",e)},clear:function(){this.$emit("clear")}}}),biigle.$component("labelTrees.components.loader",{template:'<span class="loader" :class="{\'loader--active\': active}"></span>',props:{active:{type:Boolean,required:!0}}}),biigle.$component("labelTrees.components.manualLabelForm",{mixins:[biigle.$require("labelTrees.mixins.labelFormComponent")],methods:{submit:function(){var e={name:this.selectedName,color:this.selectedColor};this.parent&&(e.parent_id=this.parent.id),this.$emit("submit",e)}}}),biigle.$component("labelTrees.components.memberListItem",{template:'<li class="list-group-item clearfix"><span class="pull-right"><span v-if="editing && !isOwnUser"><form class="form-inline"><select class="form-control input-sm" :title="\'Change the role of \' + name" v-model="roleId" @change="changeRole"><option v-for="role in roles" :value="role.id" v-text="role.name"></option></select> <button type="button" class="btn btn-default btn-sm" :title="\'Remove \' + name" @click="removeMember">Remove</button></form></span><span v-else><span class="text-muted" v-text="role.name"></span></span></span><span v-text="name"></span> <span class="text-muted" v-if="isOwnUser">(you)</span></li>',props:{member:{type:Object,required:!0},ownId:{type:Number,required:!0},editing:{type:Boolean,required:!0},roles:{type:Array,required:!0}},data:function(){return{roleId:null}},computed:{isOwnUser:function(){return this.member.id===this.ownId},name:function(){return this.member.firstname+" "+this.member.lastname},role:function(){var e=this;return this.roles.find(function(t){return e.member.role_id===t.id})}},methods:{removeMember:function(){this.$emit("remove",this.member)},changeRole:function(){this.$emit("update",this.member,{role_id:this.roleId})}},created:function(){this.roleId=this.member.role_id}}),biigle.$component("labelTrees.components.membersPanel",function(){var e=biigle.$require("messages.store"),t=biigle.$require("api.users");return{template:'<div class="panel panel-default" :class="classObject"><div class="panel-heading">Members<span class="pull-right"><loader :active="loading"></loader> <button class="btn btn-default btn-xs" title="Edit members" @click="toggleEditing" :class="{active: editing}"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></span></div><div class="panel-body" v-if="editing"><form class="form-inline" @submit.prevent="attachMember"><div class="form-group"><typeahead :items="availableUsers" placeholder="User name" @select="selectMember" :value="selectedMemberName"></typeahead> <select class="form-control" title="Role of the new user" v-model="selectedRole"><option v-for="role in roles" :value="role.id" v-text="role.name"></option></select> <button class="btn btn-default" type="submit" :disabled="!canAttachMember">Add</button></div></form></div><ul class="list-group list-group-restricted"><member-list-item v-for="member in members" :key="member.id" :member="member" :own-id="ownId" :editing="editing" :roles="roles" @update="updateMember" @remove="removeMember"></member-list-item><li class="list-group-item list-group-item-info" v-if="!hasMembers"><slot></slot></li></ul></div>',mixins:[biigle.$require("labelTrees.mixins.editor")],components:{typeahead:biigle.$require("labelTrees.components.typeahead"),memberListItem:biigle.$require("labelTrees.components.memberListItem"),loader:biigle.$require("labelTrees.components.loader")},data:function(){return{selectedMember:null,selectedRole:null,users:[]}},props:{members:{type:Array,required:!0},roles:{type:Array,required:!0},ownId:{type:Number,required:!0},defaultRole:{type:Number},loading:{type:Boolean,default:!1}},computed:{classObject:function(){return{"panel-warning":this.editing}},availableUsers:function(){return this.users.filter(this.isntMember)},canAttachMember:function(){return!this.loading&&this.selectedMember&&this.selectedRole},hasMembers:function(){return this.members.length>0},selectedMemberName:function(){return this.selectedMember?this.selectedMember.name:""},memberIds:function(){return this.members.map(function(e){return e.id})}},methods:{selectMember:function(e){this.selectedMember=e},attachMember:function(){var e={id:this.selectedMember.id,role_id:this.selectedRole,firstname:this.selectedMember.firstname,lastname:this.selectedMember.lastname};this.$emit("attach",e),this.selectedMember=null},updateMember:function(e,t){this.$emit("update",e,t)},removeMember:function(e){this.$emit("remove",e)},loadUsers:function(){t.query().then(this.usersLoaded,e.handleResponseError)},usersLoaded:function(e){e.data.forEach(function(e){e.name=e.firstname+" "+e.lastname}),Vue.set(this,"users",e.data)},isntMember:function(e){return this.memberIds.indexOf(e.id)===-1}},created:function(){this.defaultRole?this.selectedRole=this.defaultRole:this.selectedRole=this.roles[0].id,this.$once("editing.start",this.loadUsers)}}}),biigle.$component("labelTrees.components.typeahead",{template:'<typeahead class="typeahead clearfix" :data="items" :placeholder="placeholder" :on-hit="selectItem" :template="template" :disabled="disabled" :value="value" match-property="name" @clear="clear"></typeahead>',data:function(){return{template:"{{item.name}}"}},components:{typeahead:VueStrap.typeahead},props:{items:{type:Array,required:!0},placeholder:{type:String,default:"Item name"},disabled:{type:Boolean,default:!1},value:{type:String,default:""}},methods:{selectItem:function(e,t){e&&(this.$emit("select",e),t.reset(),this.$nextTick(function(){t.val=t.value}))},clear:function(){this.$emit("select",void 0)}}}),biigle.$component("labelTrees.components.wormsLabelForm",{mixins:[biigle.$require("labelTrees.mixins.labelFormComponent")],components:{wormsResultItem:biigle.$require("labelTrees.components.wormsResultItem")},data:function(){return{results:[],recursive:!1,hasSearched:!1}},computed:{hasResults:function(){return this.results.length>0},recursiveButtonClass:function(){return{active:this.recursive,"btn-primary":this.recursive}}},methods:{findName:function(){var e=biigle.$require("labelTrees.wormsLabelSource"),t=biigle.$require("api.labelSource"),i=biigle.$require("messages.store"),l=this;this.$emit("load-start"),t.query({id:e.id,query:this.selectedName}).then(this.updateResults,i.handleErrorResponse).finally(function(){l.hasSearched=!0,l.$emit("load-finish")})},updateResults:function(e){this.results=e.data},importItem:function(e){var t=biigle.$require("labelTrees.wormsLabelSource"),i={name:e.name,color:this.selectedColor,source_id:e.aphia_id,label_source_id:t.id};this.recursive?i.recursive="true":this.parent&&(i.parent_id=this.parent.id),this.$emit("submit",i)},toggleRecursive:function(){this.recursive=!this.recursive}}}),biigle.$component("labelTrees.components.wormsResultItem",{props:{item:{type:Object,required:!0},recursive:{type:Boolean,required:!0},labels:{type:Array,required:!0},parent:{type:Object,default:null}},computed:{classification:function(){return this.item.parents.join(" > ")},buttonTitle:function(){return this.recursive?"Add "+this.item.name+" and all WoRMS parents as new labels":this.parent?"Add "+this.item.name+" as a child of "+this.parent.name:"Add "+this.item.name+" as a root label"},classObject:function(){return{"list-group-item-success":this.selected}},selected:function(){var e=this;return!!this.labels.find(function(t){return t.source_id==e.item.aphia_id})}},methods:{select:function(){this.selected||this.$emit("select",this.item)}}}),biigle.$component("labelTrees.mixins.editor",{data:function(){return{editing:!1}},methods:{startEditing:function(){this.editing=!0,this.$emit("editing.start")},finishEditing:function(){this.editing=!1,this.$emit("editing.stop")},toggleEditing:function(){this.editing?this.finishEditing():this.startEditing()}}}),biigle.$component("labelTrees.mixins.labelFormComponent",{props:{labels:{type:Array,required:!0},color:{type:String,default:""},parent:{type:Object,default:null},name:{type:String,default:""}},components:{typeahead:biigle.$require("labelTrees.components.typeahead")},computed:{selectedColor:{get:function(){return this.color},set:function(e){this.$emit("color",e)}},selectedName:{get:function(){return this.name},set:function(e){this.$emit("name",e)}},selectedParent:function(){return this.parent?this.parent.name:""},hasNoLabels:function(){return 0===this.labels.length},hasNoParent:function(){return!this.parent},hasNoName:function(){return!this.name}},methods:{refreshColor:function(){this.selectedColor=biigle.$require("labelTrees.randomColor")()},resetParent:function(){this.$emit("parent",null)},selectLabel:function(e){this.$emit("parent",e)}}}),biigle.$component("labelTrees.mixins.loader",{components:{loader:biigle.$require("labelTrees.components.loader")},data:function(){return{loading:!1}},methods:{startLoading:function(){this.loading=!0},finishLoading:function(){this.loading=!1}}});