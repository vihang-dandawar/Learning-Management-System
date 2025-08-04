import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import axios from 'axios';
import { GetCourseById ,BuyCourse,CoursePurchase} from '../../services/Userservice';

function BuyCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch course details (optional)
    GetCourseById(courseId)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load course', err);
        setLoading(false);
      });
  }, [courseId]);


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
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
      amount: course.price ,
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
  console.log("✅ Payment successful:", response);

  try {
    await CoursePurchase({
      courseId: course.id,
      razorpayPaymentId: response.razorpay_payment_id
    });

    alert('✅ Purchase recorded successfully!');
    // optionally redirect or update state
    // setIsPurchased(true);
  } 

 catch (error) {
    console.error('Error recording purchase:', error);
    alert('Payment succeeded but purchase not saved!');
  }
}
,








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
    console.error('❌ Payment error:', err);
    alert('❌ Failed to start payment');
  }
};
 



  if (loading) return <div className="text-center mt-5">Loading course...</div>;

  return (
    <div className="container py-5 text-center">
      <h2>Buy: {course.title}</h2>
      <p className="text-muted">Instructor: {course.instructor}</p>
      <p><strong>Price:</strong> ₹{course.price}</p>
      <button className="btn btn-success px-4 py-2 mt-3" onClick={handlePayment}>
        Pay ₹{course.price}
      </button>
    </div>
  );
}

export default BuyCoursePage;
