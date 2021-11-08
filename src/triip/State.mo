import TrieMap "mo:base/TrieMap";
import Trie "mo:base/Trie";
import Types "Types";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Prelude "mo:base/Prelude";
module{
  public type Map<K,V> = TrieMap.TrieMap<K,V>;
  public type MapShared<K,V> = Trie.Trie<K,V>;
  public type State = {
    profiles : Map<Principal,Types.Profile>;
    travelplans : Map<Text,Types.TravelPlan>;
  };
  public type StateShared = {
    profiles : MapShared<Principal,Types.Profile>;
    travelplans : MapShared<Text,Types.TravelPlan>;
  };
  public func empty() : State { 
    {
      profiles = TrieMap.TrieMap<Principal,Types.Profile>(Principal.equal, Principal.hash);
      travelplans = TrieMap.TrieMap<Text,Types.TravelPlan>(Text.equal,Text.hash);
    };
  };
  public func share(state : State) : StateShared {
    Prelude.nyi(); // to do -- for testing / upgrades sub-story
  };
  public func fromShared(share : StateShared) : State {
    Prelude.nyi(); // to do -- for testing / upgrades sub-story
  };
}