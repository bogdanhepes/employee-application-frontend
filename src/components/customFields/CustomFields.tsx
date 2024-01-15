type InputProps = {
  input: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
  meta: { touched: boolean; error: string };
};

export const UsernameInputComponent: React.FC<InputProps> = ({
  input,
  meta,
}) => {
  return (
    <>
      {meta.touched && meta.error && (
        <span className="mt-5" style={{ color: "red", fontSize: "12px" }}>
          *{meta.error}*
        </span>
      )}
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput1"
          placeholder="Username"
          onChange={input.onChange}
          value={input.value}
        />
        <label htmlFor="floatingInput1">Username</label>
      </div>
    </>
  );
};

export const PasswordInputComponent: React.FC<InputProps> = ({
  input,
  meta,
}) => {
  return (
    <>
      {meta.touched && meta.error && (
        <span className="mt-5" style={{ color: "red", fontSize: "12px" }}>
          *{meta.error}*
        </span>
      )}
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingInput2"
          placeholder="Password"
          onChange={input.onChange}
          value={input.value}
        />
        <label htmlFor="floatingInput2">Password</label>
      </div>
    </>
  );
};

export const CheckInputComponent: React.FC<InputProps> = ({ input }) => {
  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={input.onChange}
          value={input.value}
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Remember Me
        </label>
      </div>
    </>
  );
};
