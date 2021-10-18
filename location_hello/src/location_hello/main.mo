actor {

    public func location(cities : [Text]) : async Text {
        return "Hello, " # (debug_show cities) # "!";
    }; 

    public func location_pretty(cities: [Text]) : async Text {
        var str = "Hello from ";
        for (city in cities.vals()) {
            str := str # city # ", ";
        };
        str # "bon voyage!";
    };
};
