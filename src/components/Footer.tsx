export default function Footer() {
    return (
      <footer className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} VacancyBee. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }