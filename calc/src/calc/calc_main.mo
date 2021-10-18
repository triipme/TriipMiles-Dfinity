// Create simple Calc actor
actor Calc { 
    var cell : Int = 0;

    // Funcs to add, sub, mul and div
    public func add(n : Int) : async Int { cell += n; cell };
    public func sub(n : Int) : async Int {cell -= n; cell};
    public func mul(n : Int) : async Int {cell *= n; cell};
    public func div(n : Int) : async ?Int {
        if ( n == 0 ) {
            return null; // divide by zezo error
        } else {
            cell /= n;
            ?cell;
        }
    };

    // Clear the calc and reset to Zero
    public func clearAll() : async Int {
        if ( cell : Int != 0 ) {
            cell -= cell;
        };
        return cell
    };
};