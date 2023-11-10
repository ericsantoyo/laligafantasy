export default (props) => {
  const cellValue = props.value;

  // let number = (cellValue).toLocaleString('en-US', {
  //   valute: 'USD',

  // });
  const formatter = new Intl.NumberFormat("en-GB", {});

  if (props.value > 1) {
    return (
      <div className="flex justify-center md:justify-end items-center h-full mr-3 sm:mr-0 tabular-nums tracking-tight md:tracking-normal">
        {formatter.format(cellValue)}
      </div>
    );
  }

  if (props.value < 1) {
    return (
      <div className="flex justify-center md:justify-end items-center h-full tabular-nums tracking-tight md:tracking-normal	">
        {formatter.format(cellValue)}
      </div>
    );
  }
};

