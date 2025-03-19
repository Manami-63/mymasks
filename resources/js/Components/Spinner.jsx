import {ClipLoader} from "react-spinners";

const Spinner = ({loading, size = 150, override = {display: 'block', margin: '100px auto'}}) => {
  return (
      <ClipLoader
      color='#FCE8E8'
      loading={loading}
      cssOverride={override}
      size={size}
      />
  )
}

export default Spinner
