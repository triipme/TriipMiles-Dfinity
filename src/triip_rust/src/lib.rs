// use ic_cdk::export::{candid::{CandidType, Deserialize}, Principal};
// use ic_cdk::storage;
use ic_cdk_macros::*;
use ic_cdk::*;
use std::collections::HashMap;
use std::time::Duration;
use std::error::Error;

#[query]
async fn triip_rust() -> Result<(), Box<dyn Error>> {
    let client = reqwest::Client::new();
    let doge = client
        .get("https://api.coinstats.app/public/v1/coins/dogecoin")
        .header("Accept", "text/plain")
        .timeout(Duration::from_secs(3))
        .send()
        .await?
        .text()
        .await?;
    format!("{:}", doge);
    Ok(())
}