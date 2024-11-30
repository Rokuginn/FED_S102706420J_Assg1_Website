// Product details database
const productDetails = {
    ps5pro: {
        category: "Console",
        availability: "In Stock",
        description: "Experience gaming like never before with the PlayStation 5 Pro. Featuring enhanced graphics, faster loading times, and improved performance for the most demanding games.",
        specs: {
            "CPU": "Custom AMD Ryzen™ with Zen 2 architecture",
            "GPU": "Custom RDNA 3 GPU with ray tracing acceleration",
            "Memory": "16GB GDDR6 RAM",
            "Storage": "1TB NVMe SSD",
            "Resolution": "Up to 8K",
            "Frame Rate": "Up to 120fps with 4K resolution"
        }
    },
    ps5slim: {
        category: "Console",
        availability: "In Stock",
        description: "A sleeker, more compact version of the PS5 with all the power you need for next-gen gaming.",
        specs: {
            "CPU": "Custom AMD Ryzen™ with Zen 2",
            "GPU": "Custom RDNA 2 GPU",
            "Memory": "16GB GDDR6",
            "Storage": "1TB NVMe SSD",
            "Size": "30% smaller than original PS5",
            "Weight": "3.2 kg"
        }
    },
    dswcontrol: {
        category: "Accessory",
        availability: "In Stock",
        description: "Experience gaming with enhanced feedback, adaptive triggers, and built-in microphone in this revolutionary controller.",
        specs: {
            "Battery": "Built-in rechargeable lithium-ion",
            "Connectivity": "Bluetooth 5.1, USB Type-C",
            "Haptic Feedback": "Dual actuators",
            "Microphone": "Built-in array",
            "Speaker": "Integrated",
            "Weight": "280g"
        }
    },
    pulseheadset: {
        category: "Accessory",
        availability: "In Stock",
        description: "Immerse yourself in 3D audio technology for a rich, detailed soundscape.",
        specs: {
            "Audio": "Tempest 3D AudioTech",
            "Battery Life": "Up to 12 hours",
            "Connectivity": "Wireless adapter, 3.5mm jack",
            "Microphone": "Hidden noise-canceling",
            "Controls": "On-ear controls",
            "Weight": "295g"
        }
    },
     ps5: {
        category: "Console",
        availability: "In Stock",
        description: "Enter the next generation of gaming with the PlayStation 5. Experience lightning-fast loading, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
        specs: {
            "CPU": "Custom AMD Ryzen™ with Zen 2",
            "GPU": "Custom RDNA 2 GPU",
            "Memory": "16GB GDDR6",
            "Storage": "825GB NVMe SSD",
            "Resolution": "Up to 4K",
            "Frame Rate": "Up to 120fps"
        }
    },

    dsecontrol: {
        category: "Accessory",
        availability: "In Stock",
        description: "Take your gaming to the next level with the DualSense Edge. Featuring customizable controls, replaceable stick modules, and back buttons for professional-grade gaming.",
        specs: {
            "Battery": "Built-in rechargeable lithium-ion",
            "Connectivity": "Bluetooth 5.1, USB Type-C",
            "Features": "Replaceable stick modules, Back buttons",
            "Profiles": "Multiple custom profiles",
            "Extra": "Carrying case included",
            "Weight": "325g"
        }
    },

    pulseearbuds: {
        category: "Accessory",
        availability: "In Stock",
        description: "Experience PlayStation's Tempest 3D AudioTech in a compact, wireless earbud design. Perfect for gaming on-the-go or at home.",
        specs: {
            "Audio": "Tempest 3D AudioTech",
            "Battery Life": "Up to 5 hours (earbuds), 15 hours (with case)",
            "Connectivity": "Bluetooth 5.2, USB-C dongle",
            "Features": "AI-enhanced noise rejection",
            "Charging": "USB-C, Wireless Qi",
            "Weight": "7g per earbud"
        }
    },

    pscamera: {
        category: "Accessory",
        availability: "In Stock",
        description: "Broadcast yourself in smooth, sharp Full-HD with the PlayStation Camera. Perfect for streaming and PlayStation VR.",
        specs: {
            "Resolution": "1920 x 1080",
            "FPS": "60 frames per second",
            "Field of View": "85 degrees",
            "Features": "Dual lenses, Built-in stand",
            "Connection": "USB Type-A",
            "Weight": "185g"
        }
    },
    ps5: {
        category: "Console",
        availability: "In Stock",
        description: "Enter the next generation of gaming with the PlayStation 5. Experience lightning-fast loading, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
        specs: {
            "CPU": "Custom AMD Ryzen™ with Zen 2",
            "GPU": "Custom RDNA 2 GPU",
            "Memory": "16GB GDDR6",
            "Storage": "825GB NVMe SSD",
            "Resolution": "Up to 4K",
            "Frame Rate": "Up to 120fps"
        }
    },

    dsecontrol: {
        category: "Accessory",
        availability: "In Stock",
        description: "Take your gaming to the next level with the DualSense Edge. Featuring customizable controls, replaceable stick modules, and back buttons for professional-grade gaming.",
        specs: {
            "Battery": "Built-in rechargeable lithium-ion",
            "Connectivity": "Bluetooth 5.1, USB Type-C",
            "Features": "Replaceable stick modules, Back buttons",
            "Profiles": "Multiple custom profiles",
            "Extra": "Carrying case included",
            "Weight": "325g"
        }
    },

    pulseearbuds: {
        category: "Accessory",
        availability: "In Stock",
        description: "Experience PlayStation's Tempest 3D AudioTech in a compact, wireless earbud design. Perfect for gaming on-the-go or at home.",
        specs: {
            "Audio": "Tempest 3D AudioTech",
            "Battery Life": "Up to 5 hours (earbuds), 15 hours (with case)",
            "Connectivity": "Bluetooth 5.2, USB-C dongle",
            "Features": "AI-enhanced noise rejection",
            "Charging": "USB-C, Wireless Qi",
            "Weight": "7g per earbud"
        }
    },

    pscamera: {
        category: "Accessory",
        availability: "In Stock",
        description: "Broadcast yourself in smooth, sharp Full-HD with the PlayStation Camera. Perfect for streaming and PlayStation VR.",
        specs: {
            "Resolution": "1920 x 1080",
            "FPS": "60 frames per second",
            "Field of View": "85 degrees",
            "Features": "Dual lenses, Built-in stand",
            "Connection": "USB Type-A",
            "Weight": "185g"
        }
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const productModal = document.getElementById('product-details-modal');
    const closeProductModalBtn = document.getElementById('close-product-modal');

    // Add click event to product items
    document.querySelectorAll('.product__item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't trigger modal if clicking the add to cart button
            if (e.target.classList.contains('add-to-cart')) return;
            
            const addToCartBtn = item.querySelector('.add-to-cart');
            if (!addToCartBtn) return;

            const productId = addToCartBtn.dataset.id;
            const productName = addToCartBtn.dataset.name;
            const productPrice = addToCartBtn.dataset.price;
            const productImage = addToCartBtn.dataset.image;
            const details = productDetails[productId];

            if (details) {
                // Update modal content
                document.querySelector('.product-details__image').src = productImage;
                document.querySelector('.product-details__title').textContent = productName;
                document.querySelector('.product-details__price').textContent = `$${productPrice}`;
                document.querySelector('.product-details__category').textContent = `Category: ${details.category}`;
                document.querySelector('.product-details__availability').textContent = `Availability: ${details.availability}`;
                document.querySelector('.product-details__description').textContent = details.description;
                // Update specifications
                const specsGrid = document.querySelector('.specs-grid');
                specsGrid.innerHTML = '';
                if (details.specs) {
                    Object.entries(details.specs).forEach(([key, value]) => {
                        specsGrid.innerHTML += `
                            <div class="spec-item">
                                <span class="spec-label">${key}:</span>
                                <span class="spec-value">${value}</span>
                            </div>
                        `;
                    });
                }   
                // Clone and set up add-to-cart button
                const modalAddToCartBtn = addToCartBtn.cloneNode(true);
                document.querySelector('.product-details__info .add-to-cart').replaceWith(modalAddToCartBtn);
                setupAddToCartButton(modalAddToCartBtn);

                openProductModal();
            }
        });
    });

    function openProductModal() {
        productModal.classList.add('active');
        productModal.style.display = 'flex';
    }

    function closeProductModal() {
        productModal.classList.remove('active');
        productModal.style.display = 'none';
    }

    // Close modal functionality
    closeProductModalBtn.addEventListener('click', closeProductModal);
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    // Reuse cart functionality
    function setupAddToCartButton(button) {
        button.addEventListener('click', () => {
            const { id, name, price, image } = button.dataset;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (!loggedInUser) {
                alert('Please log in to add items to cart');
                return;
            }

            const user = users.find(u => u.username === loggedInUser.username);
            if (!user.cart) user.cart = [];

            user.cart.push({ id, name, price, imgSrc: image });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Added to cart!');
        });
    }
});