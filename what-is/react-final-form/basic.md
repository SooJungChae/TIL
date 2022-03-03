## `<Form />`

A component that surrounds your entire form and manages the form state. It can inject form state and functionality, e.g. a handleSubmit function for you to pass to your <form> element, via render props.

On mount, <Form/> creates a Final Form form instance, subscribes to changes on that form, and places it into the React Context so that the <Field/> and <FormSpy/> components can see it.

The <Form/> will rerender any time the form state it is subscribed to changes. By default it subscribes to all form state. You can control which form state it subscribes to with the subscription prop.
  
## `<useForm />`

**The useForm() hook plucks the FormApi out of the React context for you.** It will throw an exception if you try to use it outside of a <Form/> component.
  
## `FormApi`
  Allows batch updates by silencing notifications while the fn is running. Example:

```js
form.batch(() => {
  form.change('firstName', 'Erik') // listeners not notified
  form.change('lastName', 'Rasmussen') // listeners not notified
}) // NOW all listeners notified
```
  
