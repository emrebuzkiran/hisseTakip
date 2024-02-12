import { useRouter } from "next/router";

const isLogged = (WrappedComponent) => {
  let token = document.cookie.substring("jwt=".length);
  return (props) => {
    const router = useRouter(); // Assuming access to router within the component

    const handleAuthentication = async () => {
      try {
        
        

        const response = await axios.post(
          "http://localhost:8080/api/auth/test",
          { token }
        );

        if (response.data.isValid) {
          // Authenticated, proceed with wrapped component
          return <WrappedComponent {...props} />;
        } else {
          // Not authenticated, redirect
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Handle errors gracefully (e.g., display error message)
      }
    };

    // Use initial loading state or conditional rendering
    return (
      <div>
        {/* Loading indicator or other content while authentication happens */}
        {handleAuthentication()}
      </div>
    );
  };
};

export default isLogged;
