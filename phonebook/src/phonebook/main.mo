import L "mo:base/List";
import A "mo:base/AssocList";

// The Phonebook actor
actor {

    // Type alias make the rest of code easier to read
    public type Name = Text;
    public type Phone = Text;

    // The actor maps names to phone numbers
    flexible var book: A.AssocList<Name, Phone> = L.nil<(Name, Phone)>();

    // An auxiliary function checks whether two names are equals
    func nameEq(l: Name, r: Name): Bool {
        return l == r;
    };

    // A shared invokable function that insert a new entry into the phonebook or replaces the previous one
    public func insert( name : Name, phone : Phone) : async () {
        let (newBook, _) = A.replace<Name, Phone>(book, name, nameEq, ?phone);
        book := newBook
    };

    // A shared read-only query function that returns the (optional) phone number coresponding to the person with given name
    public query func lookup(name : Name) : async ?Phone {
        return A.find<Name, Phone>(book, name, nameEq);
    };

}