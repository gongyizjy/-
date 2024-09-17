import Vue from "vue";
/**
 * 
 * @param {Vue} comp 
 * @param {Object} props 
 * @returns 
 */
function getComponentRootDom(comp, props){
    const vm = new Vue({
      render: h => h(comp, {props})
    })
    vm.$mount();
    return vm.$el;
}

export default getComponentRootDom