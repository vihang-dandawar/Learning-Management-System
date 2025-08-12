import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetCourseById, BuyCourse, CoursePurchase } from '../../services/Userservice';

function BuyCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCourseById(courseId)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load course');
        setLoading(false);
      });
  }, [courseId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to load Razorpay SDK. Check your internet connection.');
      return;
    }

    try {
      const res = await BuyCourse({
        amount: course.price,
        currency: 'INR',
        receiptId: `receipt_course_${course.id}`,
      });

      const { id: order_id, amount, currency } = res.data;
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

      const options = {
        key: razorpayKey,
        amount,
        currency,
        name: 'LMS Academy',
        description: `Purchase: ${course.title}`,
        order_id,
        handler: async function (response) {
          try {
            await CoursePurchase({
              courseId: course.id,
              razorpayPaymentId: response.razorpay_payment_id,
            });
            alert('✅ Purchase recorded successfully!');
          } catch (error) {
            console.error('Error recording purchase:');
            alert('Payment succeeded but purchase not saved!');
          }
        },
        prefill: {
          name: 'Student User',
          email: 'student@example.com',
          contact: '9999999999',
        },
        notes: {
          courseId: course.id,
        },
        theme: {
          color: '#0d6efd',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('❌ Payment error:');
      alert('❌ Failed to start payment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Loading course...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-12 flex items-center justify-center">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">{course.title}</h2>
        <p className="text-sm text-gray-400 mb-1">Instructor: {course.instructorName}</p>
        <p className="text-lg text-gray-100 font-medium mb-6">Price: ₹{course.price}</p>
        <button
          onClick={handlePayment}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded transition duration-300 w-full"
        >
          Pay ₹{course.price}
        </button>
      </div>
    </div>
  );
}

export default BuyCoursePage;
