import SectionsContainer from "../Components/SectionsContainer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-custom-blue">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-custom-pink mb-6">
            Zenit Digital
          </h1>
          <p className="text-xl md:text-2xl text-custom-pink mb-8">
            Innovate. Create. Transform.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="min-h-screen py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-custom-green">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-lg mb-6">
                Zenit Digital is a forward-thinking digital agency focused on
                creating exceptional digital experiences. Our team of experts
                combines creativity with technical expertise to deliver
                solutions that drive results.
              </p>
              <p className="text-lg">
                Founded with a passion for innovation, we work closely with our
                clients to understand their unique challenges and develop
                customized strategies that help them achieve their goals.
              </p>
            </div>
            <div className="bg-custom-lightGreen rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-custom-green">
                Our Mission
              </h3>
              <p className="text-lg mb-4">
                To empower businesses through innovative digital solutions that
                drive growth and create meaningful connections with their
                audiences.
              </p>
              <h3 className="text-2xl font-bold mb-4 text-custom-green">
                Our Vision
              </h3>
              <p className="text-lg">
                To be the leading digital partner for businesses seeking
                transformative digital experiences that set new standards in
                their industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases-section" className="min-h-screen py-20 bg-custom-pink">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-custom-blue">
            Our Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project {item}</h3>
                  <p className="text-gray-700 mb-4">
                    A brief description of this project and the results we
                    achieved for the client.
                  </p>
                  <button className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-opacity-90 transition">
                    View Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="min-h-screen py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-custom-green">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Strategy",
                description:
                  "Comprehensive digital strategies tailored to your business goals and market position.",
              },
              {
                title: "UX/UI Design",
                description:
                  "User-centered design that creates intuitive, engaging digital experiences.",
              },
              {
                title: "Web Development",
                description:
                  "Cutting-edge web solutions built with the latest technologies and best practices.",
              },
              {
                title: "Mobile Development",
                description:
                  "Native and cross-platform mobile applications that perform flawlessly.",
              },
              {
                title: "E-commerce",
                description:
                  "Custom online shopping experiences that drive conversions and customer loyalty.",
              },
              {
                title: "Digital Marketing",
                description:
                  "Data-driven marketing strategies that connect with your target audience.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-custom-lightGreen rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-3 text-custom-green">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Sections Container */}
      <SectionsContainer />
    </main>
  );
}
