import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import axios from '../util/axios.customize';
import ProductCard from '../components/common/ProductCard';
import { 
    ShoppingCart, Star, Truck, ShieldCheck, 
    RotateCcw, Minus, Plus, Share2, Heart 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Spin, notification } from 'antd';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/v1/api/products/${id}`);
                if (res.EC === 0) {
                    setProduct(res.DT.product);
                    setRelated(res.DT.related);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        notification.success({
            message: 'Added to Cart',
            description: `${quantity}x ${product.name} has been added to your cart.`
        });
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Spin size="large" /></div>;
    if (!product) return <div className="h-screen flex items-center justify-center text-white">Product not found</div>;

    return (
        <div className="pt-24 pb-20 container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Image Gallery */}
                <div className="space-y-4">
                    <div className="glass-card overflow-hidden rounded-3xl p-4">
                        <Swiper
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="w-full aspect-square rounded-2xl overflow-hidden"
                        >
                            {product.images.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <img src={img} alt={product.name} className="w-full h-full object-cover" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="thumbs-swiper"
                    >
                        {product.images.map((img, idx) => (
                            <SwiperSlide key={idx} className="cursor-pointer opacity-50 transition-opacity hover:opacity-100 swiper-slide-thumb-active:opacity-100">
                                <div className="glass-card p-1 rounded-xl overflow-hidden aspect-square">
                                    <img src={img} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">
                            {product.category?.name}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                                ))}
                                <span className="text-gray-400 text-sm ml-2">(120 Reviews)</span>
                            </div>
                            <div className="h-4 w-[1px] bg-white/10"></div>
                            <span className="text-gray-400 text-sm">{product.soldCount}+ Sold</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-4xl font-bold text-white">${product.price.toLocaleString()}</span>
                        {product.discountPercentage > 0 && (
                            <>
                                <span className="text-xl text-gray-500 line-through">
                                    ${(product.price * (1 + product.discountPercentage/100)).toFixed(0)}
                                </span>
                                <span className="bg-secondary/20 text-secondary text-xs font-bold px-2 py-1 rounded-md">
                                    -{product.discountPercentage}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                        {product.description}
                    </p>

                    {/* Stock & Quantity */}
                    <div className="mb-10 p-6 glass-card border-white/5 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">Availability</span>
                            <span className={product.stock > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                                {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">Quantity</span>
                            <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-white">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <button 
                            onClick={handleAddToCart}
                            className="flex-grow btn-primary flex items-center justify-center gap-3 py-4 text-lg"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>
                        <button className="p-4 glass rounded-full hover:bg-white/10 transition-colors text-gray-400">
                            <Heart className="w-6 h-6" />
                        </button>
                        <button className="p-4 glass rounded-full hover:bg-white/10 transition-colors text-gray-400">
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-primary" />
                            <span className="text-xs text-gray-400">Free Express Delivery</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-xs text-gray-400">2 Year Official Warranty</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <RotateCcw className="w-5 h-5 text-primary" />
                            <span className="text-xs text-gray-400">14-Day Free Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Specifications */}
            <section className="mt-24">
                <h2 className="text-3xl font-bold text-white mb-8">Technical Specifications</h2>
                <div className="glass-card p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-white/5">
                            <span className="text-gray-400 font-medium uppercase tracking-wider text-xs">{key}</span>
                            <span className="text-gray-200 font-bold">{value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Products */}
            <section className="mt-24">
                <h2 className="text-3xl font-bold text-white mb-10">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {related.map(prod => (
                        <ProductCard key={prod._id} product={prod} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;
