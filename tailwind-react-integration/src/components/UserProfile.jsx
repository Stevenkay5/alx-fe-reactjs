function UserProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="
        bg-gray-100
        w-full
        max-w-xs sm:max-w-sm md:max-w-md
        p-4 sm:p-6 md:p-8
        rounded-xl
        shadow-lg
        transition duration-300
      ">

        <img
          src="https://via.placeholder.com/150"
          alt="User"
          className="
            w-24 h-24
            sm:w-28 sm:h-28
            md:w-36 md:h-36
            rounded-full
            mx-auto
          "
        />

        <h1 className="
          text-lg sm:text-xl md:text-2xl
          text-blue-800
          my-3 md:my-4
          text-center
          font-semibold
        ">
          John Doe
        </h1>

        <p className="
          text-sm sm:text-base
          text-gray-600
          text-center
        ">
          Developer at Example Co. Loves to write code and explore new technologies.
        </p>

      </div>

    </div>
  );
}

export default UserProfile;
