/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 * Extended to support hashing of any string (2019-04-14)
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @author (Extended by) spelgubbe
 * @see http://github.com/spelgubbe/murmurhash3
 * 
 * @param {string} key Any string
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash 
 */

function murmurhash3(key, seed) {
	var remainder, numBytes, h1, h1b, c1, c2, k1, i
    
    key = unescape(encodeURIComponent(key))
	remainder = key.length & 3
	numBytes = key.length - remainder
	h1 = seed
	c1 = 0xcc9e2d51
	c2 = 0x1b873593
	i = 0
	
	while (i < numBytes) {
	  	k1 = 
	  	  key.charCodeAt(i) |
	  	  (key.charCodeAt(++i) << 8) |
	  	  (key.charCodeAt(++i) << 16) |
	  	  (key.charCodeAt(++i) << 24)
		++i
		
		k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff
		k1 = (k1 << 15) | (k1 >>> 17)
		k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff

		h1 ^= k1
        h1 = (h1 << 13) | (h1 >>> 19)
		h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff
		h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16))
	}
	
	k1 = 0
	
	switch (remainder) {
		case 3: k1 ^= key.charCodeAt(i + 2) << 16
		case 2: k1 ^= key.charCodeAt(i + 1) << 8
		case 1: k1 ^= key.charCodeAt(i)
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
		k1 = (k1 << 15) | (k1 >>> 17)
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff
		h1 ^= k1
	}
	
	h1 ^= key.length

	h1 ^= h1 >>> 16
	h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff
	h1 ^= h1 >>> 13
	h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff
	h1 ^= h1 >>> 16

	return h1 >>> 0
}