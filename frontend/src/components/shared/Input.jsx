import { TextField } from "@mui/material";

export default function Input({type, name, label, value, onChange, extra}) {
  return (
    <TextField
      label={label}
      variant="outlined"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off" // disable browser's autofill
      sx={{          // sx me isliye likh rahe hai and not in a css file, kyuki sx me likh ke sure hai, that these will override the already existing styling
        ".MuiInputBase-input": {
          color: "rgb(248, 240, 246)"
        },

        ".MuiFormLabel-root": { // styles for the label in its normal state
          color: "rgba(248, 240, 246, 0.8)",
        },
        ".MuiFormLabel-root.Mui-focused": { // styles for the label when the TextField is focused
          color: "#f8f0f6",
        },

        ".MuiOutlinedInput-notchedOutline": { // styles for the outline in its normal state
          border: "1px solid rgba(248, 240, 246, 0.3)",
          borderRadius: "10px",
          transition:"0.15s linear"
        },
        ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { // styles for the outline on hover
          border: "1px solid rgb(248, 240, 246)",
          borderRadius: "10px"
        },
        ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { // styles for the outline when the TextField is focused
          border: "2px solid rgb(248, 240, 246)",
          borderRadius: "10px"
        },
        ...extra
      }}
    />
  );
}