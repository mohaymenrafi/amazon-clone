export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <div className="bg-[#37475A] hover:bg-[#485769] text-white text-sm p-4 text-center">
        <button type="button" onClick={scrollToTop} className="cursor-pointer">
          Back to top
        </button>
      </div>
      <div className="bg-[#232E3E] p-12">
        <div className=" max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10">
          <div className="f-text">
            <h3 className="f-title">Get to Know Us</h3>
            <div className="space-y-1">
              <p>Careers</p>
              <p>Blog</p>
              <p>About Amazon</p>
              <p>Investor Relations</p>
              <p>Amazon Devices</p>
            </div>
          </div>
          <div className="f-text">
            <h3 className="f-title">Get to Know Us</h3>
            <div className="space-y-1">
              <p>Careers</p>
              <p>Blog</p>
              <p>About Amazon</p>
              <p>Investor Relations</p>
              <p>Amazon Devices</p>
            </div>
          </div>
          <div className="f-text">
            <h3 className="f-title">Get to Know Us</h3>
            <div className="space-y-1">
              <p>Careers</p>
              <p>Blog</p>
              <p>About Amazon</p>
              <p>Investor Relations</p>
              <p>Amazon Devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
