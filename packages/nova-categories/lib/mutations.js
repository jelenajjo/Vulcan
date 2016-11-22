import Telescope, { newMutation, editMutation, removeMutation } from 'meteor/nova:lib';
import Users from 'meteor/nova:users';

const performCheck = (mutation, user, document) => {
  if (!mutation.check(user, document)) throw new Error(`Sorry, you don't have the rights to perform the mutation ${mutation.name} on document _id = ${document._id}`);
};

const mutations = {

  new: {
    
    name: 'categoriesNew',
    
    check(user, document) {
      if (!user) return false;
      return Users.canDo(user, 'categories.new');
    },
    
    mutation(root, {document}, context) {
      
      performCheck(this, context.currentUser, document);

      return newMutation({
        collection: context.Categories,
        document: document, 
        currentUser: context.currentUser,
        validate: true
      });
    },

  },

  edit: {
    
    name: 'categoriesEdit',
    
    check(user, document) {
      if (!user || !document) return false;
      return Users.canDo(user, `categories.edit.all`);
    },

    mutation(root, {documentId, set, unset}, context) {

      const document = context.Categories.findOne(documentId);
      performCheck(this, context.currentUser, document);

      return editMutation({
        collection: context.Categories, 
        documentId: documentId, 
        set: set, 
        unset: unset, 
        currentUser: context.currentUser,
        validate: true
      });
    },

  },
  
  remove: {

    name: 'categoriesRemove',
    
    check(user, document) {
      if (!user || !document) return false;
      return Users.canDo(user, `categories.remove.all`);
    },
    
    mutation(root, {documentId}, context) {

      const document = context.Categories.findOne(documentId);
      performCheck(this, context.currentUser, document);

      return removeMutation({
        collection: context.Categories, 
        documentId: documentId, 
        currentUser: context.currentUser,
        validate: true
      });
    },

  },

};

export default mutations;