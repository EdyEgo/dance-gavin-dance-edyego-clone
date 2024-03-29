import { useState, useId, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import RangeSlider from "./rangeSlider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FitCurrencyIcon from "./FitCurrencyIcon";

import {
  changeAvailabilitySelected,
  changePriceRangeNumberSelected,

  // changeAppliedFilters,
  changeProductTypeFiltersSelected,
  changeSizeFiltersSelected,
} from "../../store/productFiltersSearch";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

// interface listValuesFiltersItems{
//   value: string;
//   name: string;
//   itemsNumberAvailable: number;
//   selected: boolean;
// }

export default function SimpleAccordion() {
  const dispatch = useDispatch();
  const useid = useId();
  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const productTypeOptions: any = useSelector(
    (state: any) => state.productFiltersSearch.productTypeFiltersSelected
  );

  const sizeOptions: any = useSelector(
    (state: any) => state.productFiltersSearch.sizeFiltersSelected
  );

  const priceRangeAvailable = useSelector(
    (state: any) => state.productFiltersSearch.priceRangeAvailableToSelect
  );
  const priceRangSelected = useSelector(
    (state: any) => state.productFiltersSearch.priceRangeNumberSelected
  );

  const [inputsPriceRange, setInputsPriceRange] = useState(priceRangSelected);

  useEffect(() => {
    // when you select with the range bar or clear all the inputs on the price must change too
    setInputsPriceRange(priceRangSelected);
  }, [priceRangSelected]);

  const availabilityOptions = useSelector(
    (state: any) => state.productFiltersSearch.availabilitySelected
  );

  function setRangeValue(newPriceRange: any) {
    dispatch(changePriceRangeNumberSelected({ newPriceRange }));
    setInputsPriceRange(newPriceRange);
  }

  function setPriceRangeWithInput(newValue: number, typeInput: "min" | "max") {
    const inputTypes = {
      min: () => {
        if (
          newValue < priceRangeAvailable[0] ||
          newValue > priceRangeAvailable[1]
        ) {
          setInputsPriceRange([newValue, inputsPriceRange[1]]);
          return;
        }
        setRangeValue([newValue, priceRangSelected[1]]);

        // call setRangeValue when the value is in the right parameters
      },
      max: () => {
        if (
          newValue > priceRangeAvailable[1] ||
          newValue < priceRangeAvailable[0]
        ) {
          setInputsPriceRange([inputsPriceRange[0], newValue]);
          return;
        }
        setRangeValue([priceRangSelected[0], newValue]);
      },
    };

    inputTypes[typeInput]();
  }

  // const sortBySelectedValues = useSelector(
  //   (state: any) => state.productFiltersSearch.sortBy
  // );

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // and on click on an filter option the check box to check or uncheck , not just when you press the check button
  // maybe just use icons instead of actuall radio inputs

  return (
    <div className="bg-[#25c3c8]">
      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography> Product type</Typography> */}
          <div className="accordion-title font-medium font-sans">
            Product type
          </div>
        </AccordionSummary>
        <AccordionDetails className="gap-2 flex flex-col">
          {productTypeOptions != null &&
            Object.entries(productTypeOptions).map(
              (
                [
                  nameProductType,
                  { itemsNumberAvailable, name, value, selected },
                ]: any,
                index
              ) => {
                return (
                  <div
                    className="option flex gap-4 items-center  cursor-pointer"
                    key={useid + index}
                    onClick={() => {
                      dispatch(
                        changeProductTypeFiltersSelected({
                          productTypeName: name,
                          productTypeNewValue: !selected,
                        })
                      );
                    }}
                  >
                    <div className="check-box">
                      {selected && <CheckBoxIcon />}
                      {!selected && <CheckBoxOutlineBlankIcon />}
                    </div>
                    <div className="name font-sans">{name}</div>
                    <div className="items-available font-sans">
                      {"("}
                      {itemsNumberAvailable}
                      {")"}
                    </div>
                  </div>
                );
              }
            )}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className="accordion-title font-medium font-sans">Size</div>
        </AccordionSummary>
        <AccordionDetails className="gap-2 flex flex-col">
          {sizeOptions != null &&
            Object.entries(sizeOptions).map(
              (
                [
                  nameSize,
                  { itemsNumberAvailable, name, value, selected },
                ]: any,
                index
              ) => {
                return (
                  <div
                    className="option flex gap-4 items-center cursor-pointer"
                    key={useid + index}
                    onClick={() => {
                      dispatch(
                        changeSizeFiltersSelected({
                          productTypeName: name,
                          productTypeNewValue: !selected,
                        })
                      );
                    }}
                  >
                    <div className="check-box">
                      {selected && <CheckBoxIcon />}
                      {!selected && <CheckBoxOutlineBlankIcon />}
                    </div>
                    <div className="name font-sans">
                      {name.includes("_")
                        ? capitalizeFirstLetter(name.split("_").join(" "))
                        : capitalizeFirstLetter(name)}
                    </div>
                    <div className="items-available font-sans">
                      ({itemsNumberAvailable})
                      {/* {itemsNumberAvailable > 1
                        ? itemsNumberAvailable - 1
                        : itemsNumberAvailable} */}
                    </div>
                  </div>
                );
              }
            )}
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        {/* add click outside detector on the range */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography>Price</Typography> */}
          <div className="accordion-title font-medium font-sans">Price</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="price-range-container flex flex-col gap-4">
            <RangeSlider
              availableRange={priceRangeAvailable}
              setValue={setRangeValue}
              value={priceRangSelected}
            />
            <div className="price-range-inputs flex gap-4 items-center">
              <div>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FitCurrencyIcon
                          productsSelectedCurrency={productsSelectedCurrency}
                        />
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                  onChange={(event) => {
                    setPriceRangeWithInput(parseInt(event.target.value), "min");
                  }}
                  value={inputsPriceRange[0]}
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
              <div>to</div>
              <div>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FitCurrencyIcon
                          productsSelectedCurrency={productsSelectedCurrency}
                        />
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                  onChange={(event) => {
                    setPriceRangeWithInput(parseInt(event.target.value), "max");
                  }}
                  value={inputsPriceRange[1]}
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          {/* <Typography>Availability</Typography> */}
          <div className="accordion-title font-medium font-sans">
            Avaiability
          </div>
        </AccordionSummary>
        <AccordionDetails className="gap-2 flex flex-col">
          {availabilityOptions?.inStock != null && (
            <div
              className="in-stock flex gap-4 items-center  cursor-pointer"
              onClick={() => {
                // dispatch(
                //   changeAppliedFilters({
                //     filterName: "Availability",
                //     filterValue: "In stock",
                //     // typeSelected:"avaiabilitySelected"
                //   })
                // );

                dispatch(
                  changeAvailabilitySelected({
                    type: "inStock",
                    newValue: !availabilityOptions.inStock.selected,
                  })
                );
              }}
            >
              <div className="check-box font-sans">
                {/* <Checkbox
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              /> */}
                {availabilityOptions.inStock.selected && <CheckBoxIcon />}
                {!availabilityOptions.inStock.selected && (
                  <CheckBoxOutlineBlankIcon />
                )}
              </div>
              <div className="name font-sans">
                {availabilityOptions.inStock.name}
              </div>
              <div className="number-items font-sans">
                {"("}
                {availabilityOptions.inStock.numberItems}
                {")"}
              </div>
            </div>
          )}
          {availabilityOptions?.outOfStock != null && (
            <div
              className="out-of-stock flex gap-4 items-center  cursor-pointer"
              onClick={() => {
                // if is not selected then selected
                // dispatch(
                //   changeAppliedFilters({
                //     filterName: "Availability",
                //     filterValue: "Out of stock",
                //   })
                // );

                dispatch(
                  changeAvailabilitySelected({
                    type: "outOfStock",
                    newValue: !availabilityOptions.outOfStock.selected,
                  })
                );
              }}
            >
              <div className="check-box">
                {availabilityOptions.outOfStock.selected && <CheckBoxIcon />}
                {!availabilityOptions.outOfStock.selected && (
                  <CheckBoxOutlineBlankIcon />
                )}
              </div>
              <div className="name font-sans">
                {availabilityOptions.outOfStock.name}
              </div>
              <div className="number-items font-sans">
                {"("}
                {availabilityOptions.outOfStock.numberItems + 1}
                {")"}
              </div>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}
