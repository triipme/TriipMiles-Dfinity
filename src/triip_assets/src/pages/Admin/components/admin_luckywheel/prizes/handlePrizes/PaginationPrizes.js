import React from "react";
import "../Prizes.css";
function PaginationPrizes() {
  return (
    <>
      <div className="prizes_data">
        <div className="prizes_pagination">
          <button className="btn-pagination active ">
            <a href="#">1</a>
          </button>
          <button>
            <a href="#" className="btn-pagination">
              2
            </a>
          </button>
          <button>
            <a href="#" className="btn-next">
              Next &rsaquo;
            </a>
          </button>
          <button>
            <a href="#" className="btn-last">
              Last &raquo;
            </a>
          </button>
        </div>
        <div className="prizes_dataInfor">
          <span>
            Displaying prizes <strong>1 - 25</strong> of <strong> 35 </strong>{" "}
            in total
          </span>
        </div>
      </div>
    </>
  );
}
export default PaginationPrizes;
