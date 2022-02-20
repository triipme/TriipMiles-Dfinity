cargo build --target wasm32-unknown-unknown --release --package  triip_rust
ic-cdk-optimizer target/wasm32-unknown-unknown/release/triip_rust.wasm -o target/wasm32-unknown-unknown/release/triip_rust-opt.wasm
