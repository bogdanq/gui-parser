const css = `
.body2-body {
  background-color: black;
  color: white;
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;
}

.body2-body__mark {
  color: yellowgreen;
  font-size: 16px;
}

.body2-body__title {
  font-size: 20px;
  margin-top: 0;
}

.body2-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.body2-list__item {
  box-sizing: border-box;
  width: 370px;
  padding: 40px;
}

.body2-item__text {
  font-size: 14px;
}

.body2-item__image-wrapper {
  background-color: rgb(69, 69, 223);
  border-radius: 50%;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.body2-item__image {
  object-fit: fill;
  height: 45px;
  width: 45px;
}
`;
export const Body = ({ r }) => {
  return (
    <>
      <div ref={r} id="body2" data-id="18" data-type="BODY">
        <style>{css}</style>
        <div className="body2-body">
          <span className="body2-body__mark">Our Services</span>
          <h2 className="body2-body__title">
            We help startup's build their websites
          </h2>
          <ul className="body2-list">
            <li className="body2-list__item">
              <div className="body2-item__image-wrapper">
                <img
                  data-img-id="i2t"
                  src="https://assets.website-files.com/62e8f5c9dbfdccaf94d287ac/62f23055b2506e3766b33082_icons8-sign-up-256%20(3).png"
                  alt=""
                  className="body2-item__image"
                />
              </div>
              <p className="body2-item__text">
                Beautifully Designed. Writing result-oriented ad copy is
                difficult, as it must appeal to, entice, and convince consumers.
              </p>
            </li>
            <li className="body2-list__item">
              <div className="body2-item__image-wrapper">
                <img
                  data-img-id="i2t2"
                  src="https://assets.website-files.com/62e8f5c9dbfdccaf94d287ac/62f23055b2506e3766b33082_icons8-sign-up-256%20(3).png"
                  alt=""
                  className="body2-item__image"
                />
              </div>
              <p className="body2-item__text">
                Beautifully Designed. Writing result-oriented ad copy is
                difficult, as it must appeal to, entice, and convince consumers.{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
