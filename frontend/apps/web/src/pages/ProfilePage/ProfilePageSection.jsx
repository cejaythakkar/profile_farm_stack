const ProfilePageSection = ({ children, id, sectionTitle }) => {
  return (
    <section id={id}>
      <div className="max-w-4xl mx-auto px-4 xs:px-4">
        <h2 className="text-2xl xs:text-3xl font-bold mb-6"> {sectionTitle}</h2>
        {children}
      </div>
    </section>
  );
};

export default ProfilePageSection;
