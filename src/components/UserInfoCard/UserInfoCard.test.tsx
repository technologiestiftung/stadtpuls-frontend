import { render, screen } from "@testing-library/react";
import { UserInfoCard } from ".";

describe("component UserInfoCard", () => {
  const testEmail = "johndoe@aol.com";
  const testUsername = "johndoe";
  const testRegisterDate = "12. April 2021";

  it("should render an username header", () => {
    render(
      <UserInfoCard
        email={testEmail}
        username={testUsername}
        registerDate={testRegisterDate}
      />
    );
    const usernameHeader = screen.getByText(testUsername);
    expect(usernameHeader).toBeInTheDocument();
  });

  it("should render an email paragraph", () => {
    render(
      <UserInfoCard
        email={testEmail}
        username={testUsername}
        registerDate={testRegisterDate}
      />
    );
    const emailPara = screen.getByText(testEmail);
    expect(emailPara).toBeInTheDocument();
  });

  it("should render an registerdate paragraph", () => {
    render(
      <UserInfoCard
        email={testEmail}
        username={testUsername}
        registerDate={testRegisterDate}
      />
    );
    const registerDatePara = screen.getByText(testRegisterDate);
    expect(registerDatePara).toBeInTheDocument();
  });
});
