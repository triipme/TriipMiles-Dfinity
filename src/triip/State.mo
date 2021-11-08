import TrieMap "mo:base/TrieMap";
import Types "Types";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module{
  public type Map<K,V> = TrieMap.TrieMap<K,V>;
  public type State = {
    profiles : Map<Principal,Types.Profile>;
    travelplans : Map<Text,Types.TravelPlan>;
  };
  public func empty() : State { 
    {
      profiles = TrieMap.TrieMap<Principal,Types.Profile>(Principal.equal, Principal.hash);
      travelplans = TrieMap.TrieMap<Text,Types.TravelPlan>(Text.equal,Text.hash);
    };
  };
}