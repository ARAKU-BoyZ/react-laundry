const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="spinner-border animate-spin rounded-full border-4 border-t-4 border-blue-500 h-12 w-12">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;